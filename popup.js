// polyfill for array contains
if (!Array.prototype.contains) {
    Array.prototype.contains = function(s) {
        return this.indexOf(s) > -1
    }
}

var spinner;

function copyMime(str, mimetype) {
  document.oncopy = function(event) {
    event.clipboardData.setData(mimetype, str);
    event.preventDefault();
  };
  document.execCommand("Copy", false, null);
}

function svgToPng(svg) {
  var svgData = new XMLSerializer().serializeToString( svg );

  var canvas = document.createElement( "canvas" );
  var ctx = canvas.getContext( "2d" );

  var img = document.createElement( "img" );
  img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );

  img.onload = function() {
      ctx.drawImage( img, 0, 0 );
      
      // Now is done
      return canvas.toDataURL( "image/png" );
  };
}

function processNode(node, processedNodes, allNodes)
{
  if(node.localName == "startEvent") {
    processedNodes.splice(0, 0, node)
  } else {
    processedNodes.push(node);
  }
  if(node.localName == "subProcess") {
    var subProcessNodes = processProcess(node.children);
    for(var k = 0; k < subProcessNodes.length; k++) {
      processedNodes.push(subProcessNodes[k]);
    }
  }
  var outgoingChildren = _.filter(node.children, function(child) { 
    return child.localName == "outgoing"; 
  });
  for(var j = 0; j < outgoingChildren.length; j++)
  {
    if(_.contains(processedNodes, outgoingChildren[j])) continue;
    var seqFlowId = outgoingChildren[j].innerHTML;
    var seqFlow = _.filter(allNodes, function(node) { return node.id == seqFlowId });
    var nextSeqNodeId = _.filter(seqFlow[0].attributes, function(attr) { return attr.nodeName == "targetRef"; })[0].value;
    var nextSeqNode = _.filter(allNodes, function(node) { return node.id == nextSeqNodeId })[0];
    if(_.contains(processedNodes, nextSeqNode)) continue;
    processNode(nextSeqNode, processedNodes, allNodes);
  }
}

function getAttributeOrNull(node, attributeName) {
    var val = null;
    try {
      val = _.filter(node.attributes, function(attr) { return attr.nodeName == attributeName; })[0].value;
    }
    catch(err) { val = null; }
    return val;
}

function processProcess(processNodes) {
    var startNodes = _.filter(processNodes, function(o) { return o.localName == "startEvent"; });
    var processedNodes = [];
    
    for(var i = 0; i < startNodes.length; i++)
    {
      //console.log(startNodes[i].attributes.name.value);
      processNode(startNodes[i], processedNodes, processNodes);
    }

    return processedNodes;
}

function doAllTheStuff(processJson, tasksJson, savePicture)
{
    parser = new DOMParser();
    //console.log(responseJson.bpmn);
    xmlDoc = parser.parseFromString(processJson.bpmn, "text/xml");
    var process = xmlDoc.getElementsByTagName("process");
    var processNodes = process[0].children;
    
    var processedNodes = processProcess(processNodes);
    var doNotOutputNodeTypes = ["endEvent", "intermediateThrowEvent", "subProcess", "intermediateCatchEvent"];
    var doNotOutputNodeTypesWithoutNames = ["startEvent"];

    var displayNamesForNodeTypes = {
      //"startEvent": "FRENDS trigger",
      "scriptTask": "FRENDS code",
      "exclusiveGateway": "FRENDS if",
      "inclusiveGateway": "FRENDS switch"
    }
    var triggerNames = {
      "ManualTrigger": "FRENDS manual trigger",
      "HttpTrigger": "FRENDS HTTP trigger",
      "FileWatchTrigger": "FRENDS file trigger",
      "ScheduleTrigger": "FRENDS schedule trigger",
      "QueueTrigger": "FRENDS queue trigger",
      "ServiceBusTrigger": "FRENDS service bus trigger"
    }

    var outputStr = "<table><tr><th>Step</th><th>Type</th><th>Comment</th></tr>";
    for(var i = 0; i < processedNodes.length; i++)
    {
      if(doNotOutputNodeTypes.contains(processedNodes[i].localName)) continue;
      var name = getAttributeOrNull(processedNodes[i], "name");
      if(doNotOutputNodeTypesWithoutNames.contains(processedNodes[i].localName) && name == null) continue;

      var nodeFrendsType = null;
      var description = null;
      if(processedNodes[i].localName == "task")
      {
        var elementParameters = _.filter(processJson.elementParameters, function(params) {
          return params.id == processedNodes[i].id;
        })[0];
        var taskUri = elementParameters.selectedTypeId;
        var task = _.filter(tasksJson, function(task) { return task.uri == taskUri; })[0];
        // If we did not find the task - this is 99% an obsolete task
        if(task == undefined) {
          task = _.filter(processJson.obsoleteTasks, function(task) { return task.uri == taskUri; })[0];
        }
        var taskPcs = task.name.split(".");
        nodeFrendsType = taskPcs[taskPcs.length-2] + "." + taskPcs[taskPcs.length-1];
        description = elementParameters.description;
      }
      else if(processedNodes[i].localName == "startEvent")
      {
        var elementParameters = _.filter(processJson.elementParameters, function(params) {
          return params.id == processedNodes[i].id;
        })[0];
        nodeFrendsType = triggerNames[elementParameters.selectedTypeId];
      }
      else
      {
        nodeFrendsType = displayNamesForNodeTypes[processedNodes[i].localName];
      }

      var str = (name == null ? "<unnamed>" : name) + " / " + nodeFrendsType + " / " + description;
      var strHtml = 
        "<tr>" +
        "<td>" + (name == null ? "<unnamed>" : name) + "</td>" + 
        "<td>" + nodeFrendsType + "</td>" + 
        "<td>" + (description == null ? "" : description) + "</td>" + 
        "</tr>";
      outputStr += strHtml;
    }

    outputStr += "</table>";

    copyMime(outputStr, 'text/html');
    
    if(!savePicture) { 
      //alert("All done, just paste into Confluence now");
      spinner.stop();
      $('#status').text('DONE!!!!111');
      $('#status').fadeIn(100).fadeOut(3000);

      return;
    }

    // Export svg
    var BpmnViewer = window.BpmnJS;
    var viewer = new BpmnViewer({ container: 'body' });
    viewer.importXML(processJson.bpmn, function(err) {
      if (err) {
        console.log('Error rendering SVG', err);
      } else {
        console.log('Successfully rendered SVG');
        viewer.saveSVG(function(err, svg) {
          var svgDom = $(svg);
          var scriptTasks = svgDom.find('g[data-element-id*="ScriptTask_"]');
          for(var i = 0; i < scriptTasks.length; i++)
          {
            // We cannot get the text from SVG as it will not contain correct spaces.
            // Instead - get name from element parameters.
            var id = $(scriptTasks[i]).attr('data-element-id');
            var name = _.filter(processJson.elementParameters, function(o) { return o.id == id; })[0].name;
            var wrappedLines = wordWrap(name, 20).split("\n");

            var xoffset = 0;
            var yoffset = 45;
            var outWrapperSvg = "";
            for(var j = 0; j < wrappedLines.length; j++)
            {
              outWrapperSvg += '<tspan x="'+xoffset+'" y="'+yoffset+'">'+wrappedLines[j]+'</tspan>';
              yoffset += 15;
            }

            $(scriptTasks[i]).find('text').empty();
            $(scriptTasks[i]).find('text').append(outWrapperSvg);
            
          }

          var canvas = document.createElement( "canvas" );
          canvas.width = svgDom[4].width.baseVal.value;
          canvas.height = svgDom[4].height.baseVal.value;
          var ctx = canvas.getContext( "2d" );

          var img = document.createElement( "img" );
          img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgDom[4].outerHTML ) );
          img.onload = function() {
              ctx.drawImage( img, 0, 0 );
              var jpegBlob = canvas.toBlob(function(blob){
                saveAs(blob, "img.png");
                spinner.stop();
                $('#status').text('DONE!!!!111');
                $('#status').fadeIn(100).fadeOut(3000);
              }, 'image/png');
          };
        });
      }
    });
}

function copyImageToClipboard(dataUrl) {
    var img = $('<img src="'+dataUrl+'" />');
    var div = $('#imgContainer');
    div.empty();
    div.append(img);
    div.contentEditable = true;
    var range;
    if (document.createRange) {
      range = document.createRange();
      range.selectNodeContents(div[0]);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      div.focus();
      document.execCommand('copy');
    }
    div.contentEditable = false;
  }

function wordWrap(str, maxWidth) {
    var newLineStr = "\n"; done = false; res = '';
    do {                    
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res + str;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};

// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   copyDocumentationToClipboard(tab);
// });

function copyDocumentationToClipboard(tab, savePicture) {
  spinner.spin();
  console.log(tab);
  console.log('Processing ' + tab.url);

  // The initial URL is:
  // https://sales-supp.frendsapp.com/Process/Edit/357

  // The JSON is availabe at:
  // https://sales-supp.frendsapp.com/api/process/?id=357

  var processApiUrl = tab.url.replace("Process/Edit/", "api/process/?id=");
  console.log(processApiUrl);
  

  var xhr = new XMLHttpRequest();
  xhr.open("GET", processApiUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var processJson = JSON.parse(xhr.responseText);
      var xhr2 = new XMLHttpRequest();
      var tasksUrl = new URL(tab.url).origin + "/api/process/task";
      xhr2.open("GET", tasksUrl, true);
      xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
          var tasksJson = JSON.parse(xhr2.responseText);
          doAllTheStuff(processJson, tasksJson, savePicture);
        }
      }
      xhr2.send();
    }
  }
  xhr.send();

  var result = xhr.responseText;
}

function tellMeDadJoke()
{
  $.getJSON('https://icanhazdadjoke.com').then(o => {
    setStatus2Text(o.joke);
  })
}

function alert(text) {
  $.alert({
    boxWidth: '300px',
    useBootstrap: false,
    content: text });
}

function copyEnvVarUsage(tab)
{
  //var answer = confirm("Are you sure you want to do this? This will make this extension query ALL processes that you are seeing, including the ones on other pages!");
  $.confirm({
    boxWidth: '300px',
    useBootstrap: false,
    title: 'Are you absolutely sure?',
    content: 'Are you sure you want to do this? This will make this extension query ALL processes that you are seeing, including the ones on other pages!',
    buttons: {
      confirm: {
        text: 'Yes, do it!',
        btnClass: 'btn-blue',
        keys: ['enter', 'shift'],
        action: function(){
          copyEnvVarUsageImpl(tab);
        }
      },
      cancel: function () {
        // do nothing
      },
    }
  });
}

function copyEnvVarUsageImpl(tab)
{
  // Initial URL:
  // https://sales-supp.frendsapp.com/Process/List/Default?timelimit=7&reverseSort=false&orderByField=name
  // Needed URL:
  // https://sales-supp.frendsapp.com/Process/GetProcessList?environmentName=Default&timeLimit=0
  var getProcessListUrl = tab.url.replace(
    /\/Process\/List\/([^?]+)[^$]+timelimit=([0-9]+)[^$]+/g, 
    '/Process/GetProcessList?environmentName=$1&timeLimit=$2');
  console.log(getProcessListUrl);
  setStatus2Text(getProcessListUrl);


  setStatus2Text("Requesting info about processes in current view, including all pages.")
  $.getJSON(getProcessListUrl, function(response) {
    console.log(response);
    setStatus2Text("Info about processes received. Total number of processes: " + response.data.processList.length);

    var countOfReceivedProcesses = 0;

    var allRefs = [];
    for(var i = 0; i < response.data.processList.length; i++) {
      processJson = response.data.processList[i]; 

      // Create URL
      // example: https://frendsvnext.frendsapp.com/api/process/?id=1734
      var processInfoUrl = tab.url.replace(
        /\/Process\/List\/[^$]+/g, 
        '/api/process/?id=' + processJson.id);
      $.getJSON(processInfoUrl, function(processInfo) {
        //console.log(processInfo);
        countOfReceivedProcesses++;
        setStatus2Text(
          "Processing process #" + countOfReceivedProcesses + 
          " / " + response.data.processList.length + ".");
          var refs = getEnvVarReferencesFromProcessInfoJson(processInfo);
          allRefs.push({ processInfo: processInfo, refs: refs });
        if(countOfReceivedProcesses == response.data.processList.length)
        {
          console.log(allRefs);
          var html = generateEnvVarHtml(allRefs);
          copyMime(html, 'text/html');
          setStatus2Text("All done! Now paste somewhere that supports HTML pasting (e.g. Confluence).");
        }
      });
    }
  });
}

function generateEnvVarHtml(allRefs)
{
  allRefs = _.sortBy(allRefs, function(r) { return r.processInfo.name; });
  var output = "<table>";
  output += "<tr><th>Process</th><th>Environment variable</th></tr>";
  for(var i = 0; i < allRefs.length; i++)
  {
    if(allRefs[i].refs.length == 0) 
    {
      output += "<tr>";
      output += '<td>' + allRefs[i].processInfo.name + '</td>';
      output += '<td>-</td>';
      output += "</tr>";
    }

    for(var j = 0; j < allRefs[i].refs.length; j++)
    {
      output += "<tr>";
      if(j == 0)
      {
        output += '<td rowspan="'+allRefs[i].refs.length+'">' + allRefs[i].processInfo.name + '</td>';
      }

      output += '<td>' + allRefs[i].refs[j] + '</td>';
      output += "</tr>";
    }

  }
  output += "</table>";

  return output;
}

function getEnvVarReferencesFromProcessInfoJson(processInfoJson)
{
  var refs = [];
  for(var i = 0; i < processInfoJson.elementParameters.length; i++)
  {
    for(var paramName in processInfoJson.elementParameters[i].parameters)
    {
      parameter = processInfoJson.elementParameters[i].parameters[paramName];
      //console.log(parameter);
      refs = refs.concat(getAllEnvRefsFromObject(parameter));
    }
  }

  refs = _.uniq(refs);
  return refs;
}

function getAllEnvRefsFromObject(object) {
  var regex = /#env\.[\w]+/i;
  var refs = [];
  for(var prop in object)
  {
    if(object[prop] == null) continue;

    if(typeof object[prop] === 'object')
    {
      refs = refs.concat(getAllEnvRefsFromObject(object[prop]));
    }
    else
    {
      var matches = regex.exec(object[prop]);
      if(matches != null)
      {
        for(var m = 0; m < matches.length; m++)
        {
          refs.push(matches[m]);
        }
      }
    }
  }
  return refs;
}

function setStatus2Text(text) {
  var el = document.getElementById('status2');
  el.innerText = text;
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('copyDocs');
    // onClick's logic below:
    button.addEventListener('click', function() {
      chrome.tabs.query({active: true}, function(tabs)
      {
        copyDocumentationToClipboard(tabs[0], false);
      });
    });

    var buttonSaveWithImage = document.getElementById('copyDocsAndSaveImage');
    // onClick's logic below:
    buttonSaveWithImage.addEventListener('click', function() {
      chrome.tabs.query({active: true}, function(tabs)
      {
        copyDocumentationToClipboard(tabs[0], true);
      });
    });

    var buttonCopyEnvVarUsage = document.getElementById('copyEnvVarUsage');
    // onClick's logic below:
    buttonCopyEnvVarUsage.addEventListener('click', function() {
      chrome.tabs.query({active: true}, function(tabs)
      {
        copyEnvVarUsage(tabs[0]);
      });
    });

    var buttonTellDadJoke = document.getElementById('tellDadJoke');
    // onClick's logic below:
    buttonTellDadJoke.addEventListener('click', function() {
      chrome.tabs.query({active: true}, function(tabs)
      {
        tellMeDadJoke();
      });
    });

    var target = document.getElementById('body')
    spinner = new Spinner()
});