		var $list = $('.todo-list')
		var $input = $('.new-todo')
		var $count = $('.todo-count')
		var leftItem = 0
		
		//add new todo item
		$(document).keypress(function (e){ 
		  var code = event.keyCode; 
		  if (13 == code && $input.is(":focus")) {
			var value = $input.val()
			$list.append('<li class="uncompleted"><div class="view"><input class="toggle" type="checkbox" name="todo-check"><label>' + value + '</label><button class="destroy"></button></div></li>')
			//update the number of left items
			leftItem++
			$count.html('<strong>'+leftItem+'</strong> item left')
		  } 
		})
		
		//delete a todo item
		$(document).on('click', '.destroy', function(e){
			if ($(e.target).parent().parent().attr('class') == 'uncompleted'){
				leftItem--
				$count.html('<strong>'+leftItem+'</strong> item left')
			}
			$(e.target).parent().parent().remove()
		})
		
		//change the state of item
		$(document).on('click', '.toggle', function(e){
		if($(e.target).parent().parent().attr('class')== 'completed'){
			$(e.target).parent().parent().attr('class', 'uncompleted')
			leftItem++
			$count.html('<strong>'+leftItem+'</strong> item left')
		}
		else{
			$(e.target).parent().parent().attr('class', 'completed')
			leftItem--
			$count.html('<strong>'+leftItem+'</strong> item left')
		}
		}) 
		
		//clear completed items
		$(document).on('click', '.clear-completed', function(e){
			$('input:checkbox').each(function () {
				if ($(this).parent().parent().prop('class') == 'completed')
					$(this).parent().parent().remove()
			})
		})
		
		$("label").dblclick(function(){
			var label = $(this)
			var txt = label.text()
			var input = $("<input class='changeItem' type='text' value="+txt+">")
			label.html(input)
			input.click(function(){return false})
			input.trigger("focus")
			input.blur(function(){
				var newText = $(this).val()
				label.html(newText)
			})
		}) 