$(document).ready(function(){
	//When user click to search button.
	$('.button-search').click(function(){
		var keyword = $('.form-input').val();

		$.get('http://vndic.naver.com/search.nhn?range=all&query=' + keyword, function(data,status){

			//Paser HTML
			var htmlText = data;

			var content = $(htmlText).find('#content').html();
			//Get word-meanings
			var wordMeanings = $(content).find('.section_word').html();

			var liTagsMeanings = $(wordMeanings).find('p');
			var thBodyMeanings = '';
			for (var i = 0; i < liTagsMeanings.length; i++) {
				var name = (liTagsMeanings[i]).innerHTML;
				name = name.replace(/[0-9]./, '');
				thBodyMeanings += '<tr><td>' + (i+1) + '.' + name + '</td></tr>';
			}

			//Get word-content
			var wordContent = $(content).find('.section_body').html();
			var liTagsContent = $(wordContent).find('li');
			var thBodyContent = '';
			var count = 1;
			for (var i = 0; i < liTagsContent.length; i++) {
				if(i % 2==0){
					var contentContent = (liTagsContent[i]).innerHTML;
					var aTag = $(contentContent).find('a');
					var aMeanings = aTag[0].innerHTML;
				}
				if(i%2==1){
					var contentContentp = (liTagsContent[i]).innerHTML;
					contentContentp = contentContentp.replace(/[\d]/, '');
					var resultContent = aMeanings + contentContentp;
				}
				if(i %2 == 0){
					continue;
				}
				thBodyContent += '<tr><td>' + count + '. ' + resultContent + '</td></tr>';
				count++;
				aMeanings = '';
				contentContentp = '';
			}

			//get word-example
			var wordExample = $(content).find('.section_exam').html();
			var thBodyExample = '';
			var countExample = 1;
			var liTagsExample = $(wordExample).find('li');
			for (var i = 0; i < liTagsExample.length; i+=3) {
				var nameExampleLi = $(liTagsExample[i]).find('li.lst_txt');
				var nameExample = nameExampleLi.html();
				var koreanExampleLi = $(liTagsExample[i]).find('li.lst_txt2');
				var koreanExample = koreanExampleLi.text();
				koreanExample = koreanExample.replace(/(<span(.*)<\/span>)/, '');
				thBodyExample += '<tr><td>' + countExample  + '. ' + nameExample + ': ' + koreanExample + '</td></tr>';
				countExample++;
			}

			var availabelHtml = '<div role="tabpanel">\
	    		<!-- Nav tabs -->\
	    		<ul class="nav nav-tabs" role="tablist">\
	    			<li role="presentation" class="active">\
	    				<a href="#meanings" aria-controls="meanings" role="tab" data-toggle="tab">Ý nghĩa</a>\
	    			</li>\
	    			<li role="presentation">\
	    				<a href="#content" aria-controls="content" role="tab" data-toggle="tab">Nội dung</a>\
	    			</li>\
	    			<li role="presentation">\
	    				<a href="#example" aria-controls="example" role="tab" data-toggle="tab">Ví dụ</a>\
	    			</li>\
	    		</ul>\
	    		<!-- Tab panes -->\
	    		<div class="tab-content">\
	    			<div role="tabpanel" class="tab-pane active" id="meanings">\
	    				<table class="table table-striped table-bordered table-hover">\
				    		<thead class="thead-header">\
				    			<tr>\
				    				<th class="table-header">Từ: ' + keyword +'\
				    				<i class="fa fa-upload "></i></th>\
				    			</tr>\
				    		</thead><tbody>' + thBodyMeanings +
				    	'</tbody></table>\
	    			</div>\
	    			<div role="tabpanel" class="tab-pane" id="content">\
	    				<table class="table table-striped table-bordered table-hover">\
				    		<tbody>' + thBodyContent +
				    		'</tbody>\
				    	</table>\
	    			</div>\
	    			<div role="tabpanel" class="tab-pane" id="example">\
	    				<table class="table table-striped table-bordered table-hover">\
				    		<tbody>' + thBodyExample + '</tbody>\
				    	</table>\
	    			</div>\
	    		</div>\
	    	</div>';
			//Add html to view
			// $('.view').append(availabelHtml);
			$('.view').append(availabelHtml);

			//Change color of button play when users click it.
			$('.fa-play').click(function(){
				$('.fa-play').addClass('fa-play-active');
			});

			$('.fa-upload').click(function(){
				var url = 'http://vndic.naver.com/search.nhn?range=all&query=' + keyword;
 				window.open(url, '_blank');
			});
		});
	});
});