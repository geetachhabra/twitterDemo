		fetch("/tweets").then(function(res){
			res.json().then(function(data){
				data.forEach(function(tweet){
					let tweethtml = document.createElement("li");
					let deletebutton = document.createElement('button');
					let updatebutton = document.createElement('button');
					deletebutton.innerHTML = "delete";
					updatebutton.innerHTML = "update";

                    updatebutton.addEventListener('click',function(){
                    	updatetweet(tweet._id,tweet.tweet);
                    })

                     deletebutton.addEventListener('click',function(){
                    	deletetweet(tweet._id);
                    })

					tweethtml.innerText = tweet.name+"\u00A0 \u00A0"+tweet.handle+"\u00A0 \u00A0"+tweet.timestamp +'\n '+tweet.tweet ;
					document.getElementById('twitter-text').append(tweethtml);
					document.getElementById('twitter-text').append(deletebutton);
					document.getElementById('twitter-text').append(updatebutton);
				})
			})   
		})
		function updatetweet(objectid,tweet){
			let input = document.createElement('input');
			//input.placeholder = tweet;
			input.id = tweet;
			input.value = tweet;
			alert(tweet);
			let submitupdate = document.createElement('button');
			submitupdate.innerText="submit changes";
			submitupdate.addEventListener('click',function(){
				fetch('/tweet/update/'+objectid,{method:'PUT',body: JSON.stringify({tweet:document.getElementById(tweet).value,}),headers:{
					"Content-Type" : "application/json"
				}});
				window.location = "/";
			})
			document.getElementById('update-area').append(input);
			document.getElementById('update-area').append(submitupdate);

		}

		function deletetweet(objectid){
			fetch('/tweet/delete/'+objectid,{method:'DELETE'});
			window.location = "/";
		}

       fetch("/profile").then(function(res){
			res.json().then(function(data){
				data.forEach(function(profile){
					let image = document.createElement('img');
					image.src=profile.imageUrl;
					image.style="width: 100px; height: px;";
					let text =document.createElement('h3');
					text.innerText=profile.name+'\n' +profile.tweets+'\u00A0 tweets'+"\u00A0 \u00A0"+profile.followers+'\u00A0 followers'+"\u00A0 \u00A0"+profile.following+'\u00A0 following' ;;
					let info =document.createElement('h3');
					info.innerText=profile.tweets+'\u00A0 tweets \u00A0'+profile.followers+'\u00A0 followers \u00A0'+profile.following+'\u00A0 following' ;
					
					document.getElementById('profile').append(image);
					document.getElementById('profile').append(text);
					//document.getElementById('profile').append(info);
				})
			})
		})