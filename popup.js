var urls = {};
var cnts = {};
var current_url = "";

if (localStorage.accessToken) {
    var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=displayUser";
    console.log(graphUrl);

    var script = document.createElement("script");
    script.src = graphUrl;
    document.body.appendChild(script);

    function displayUser(user) {
        console.log(user);
    }
}
to=localStorage.token;
if(!to){
  $("#td-err").append("<div style='color:#000000;font-size:16px;margin-top:4px;'>Please sign in using Facebook</div>");

  console.log("hello")
}
re=""
$.ajax({
    type: 'GET',
    url: "http://scrapsh.herokuapp.com/api/post/",
    // data: data,
    // async: false,
    beforeSend: function (xhr) {
      if (xhr && xhr.overrideMimeType) {
        xhr.overrideMimeType('application/json;charset=utf-8');
      }
    },
    dataType: 'json',
    success: function(res) {
      hello=res.results.map(item => {
        return {
          "url":  item.url
        }
      })
      hell=JSON.stringify(hello)

      for (var key in hello) {
        if(hello[key].url)
        {
          if(!cnts[hello[key].url])
          {
            cnts[hello[key].url] = 1;
          }
          else
          {
            cnts[hello[key].url]++;
          }
      
          urls[hello[key].url] = hello[key].url;  
        }
      };

      checkDuplicate();
      printCnts();
      displayinhtml();
      return hell
    }
});
chrome.tabs.query({active: true, currentWindow: true },
function callback(tabs,hell) {
  console.log(hell)
  var currentTab = tabs[0]; // there will be only one in this array
  $("#url").val(currentTab.url);
  ok=currentTab.url;
  current_url = currentTab.url;
  checkDuplicate();
  console.log(ok)
});

$(function(){
	$("#form").submit(function(e){
		e.preventDefault();
		var form = $(this);
		var btn = form.find('[type="submit"]');
		btn.prop("disabled", true).html("...");
    var data = $("#form").serializeArray();
    
    var json_data = {};
    $.each(data, function(i, row){
      json_data[row.name] = row.value;
    });
    json_data['tags'] = json_data['tags'].split(",");    
    console.log(JSON.stringify(json_data));

		$("#img-processing").show();
		$("#img-done").hide();

		chrome.extension.getBackgroundPage().doPost(json_data, function(res){
			$("#img-processing").hide();
			$("#img-done").show();
			btn.prop("disabled", false).html("Submit");
		},
		function(errs){
			$("#td-err").empty();
			$.each(errs, function(err){
				$("#td-err").append("<div style='color:red' >"+err+"</div>");
			});
		});
	});

	$("#div-rating").starRating({
    starSize: 20,
    disableAfterRate: false,
    callback: function(currentRating, $el){
        	$("#rate").val(currentRating);
	    }
	});

  $('#tags').tagsInput({
    height:'auto',
    width: '96%'
  });

});


function checkDuplicate()
{
  if(urls.length == 0 || current_url == "")
    return;

  if(urls[current_url])
  {
    console.log(current_url+" is duplicate");
  }
}

function printCnts()
{
  $.each(cnts, function(url, cnt){
    if(cnt>1)
    {
      console.log(url + " found "+ cnt + " times.");
    }
  })
}

function displayinhtml()
{
    if(cnts[current_url]){
      var occurences = cnts[current_url];
    }
    else{
      var occurences = 0;
    }
    $("#count").append("<div>Reviews found : "+occurences+"</div>");
}