
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //get the street and city value
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;

    // load streetview

    // YOUR CODE GOES HERE!
    var streetUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class = "bgimg" src= "' + streetUrl +'">');

    //Nytimes ajax request
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=c5d745e3536e4bdbad2b1bb4f8ec080a';

    $.getJSON(nytimesUrl, function(data) {
      $nytHeaderElem.text('NewYorkTimes Article About' + cityStr);

      articles = data.response.docs;

      for(var i = 0; i < articles.length; i++){
        var article = articles[i];
        $nytElem.append('<li class= "article">' + '<a href = "'+ article.web_url +'">' + article.headline.main + '</a>' +
      '<p>' + article.snippet + '</p>' + '</li>');
    };
  }).error(function(e){
    $nytHeaderElem.text('not found');
  });

  //wikipedia ajax request
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ cityStr +'&format=json&callback=wikiCallback';

    $.ajax({url:wikiUrl,
            dataType:"jsonp",
            success:function(response){
              var articleList = response[1];

              for(var i= 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href = "' + url + '">' + articleStr + '</a></li>');
              };
            }
          });

    return false;
};

$('#form-container').submit(loadData);
