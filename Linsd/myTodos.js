var $list = $('.todo-list')
var $input = $('.new-todo')
var $count = $('.todo-count')
var leftItem = 0
		
//add new todo item
$(document).keypress(function (e){ 
var code = event.keyCode; 
if (13 == code && $input.is(":focus")) {   //bind enter event 
	var value = $input.val()
	if (value!==""){
		$list.append('<li class="uncompleted"><div class="view"><input class="toggle" type="checkbox" name="todo-check"><label class="item">' + value + '</label><button class="destroy"></button></div></li>')
		
		//update the number of left items
		leftItem++
		$count.html('<strong>'+leftItem+'</strong> item left')
	} 
}
})

//delete a todo item
$(document).on('click', '.destroy', function(e){
	var li=$(e.target).closest("li")   //the object need to be deleted
    if (li.hasClass("uncompleted")){
		leftItem--;
		$count.html('<strong>'+leftItem+'</strong> item left')
    }
	li.remove();
})
		
//change the state of item
$(document).on('click', '.toggle', function(e){
	var li=$(e.target).closest("li")
	if(li.hasClass('completed')){
		li.removeClass('completed')
		li.addClass('uncompleted')
		leftItem++
		$count.html('<strong>'+leftItem+'</strong> item left')
	}
	else{
		li.removeClass('uncompleted')
		li.addClass('completed')
		leftItem--
		$count.html('<strong>'+leftItem+'</strong> item left')
	}	
}) 
	
//clear completed items
$(document).on('click', '.clear-completed', function(e){
	$('.completed').each(function () {
		$(this).remove()
	})
})

//update items
$(document).on('click', 'label', function(e){
	var label = $(this)
	var txt = label.text()
	var input = $("<input class='changeItem' type='text' value="+txt+">")
	label.html(input)
	input.click(function(){return false})
	input.trigger("focus")
	input.blur(function(){
		var newText = $(this).val()
		if (newText==""){                  //remove item when the text is null
			var li=$(this).closest('li')
			if (li.hasClass("uncompleted")){
				leftItem--;
				$count.html('<strong>'+leftItem+'</strong> item left')
			}
			li.remove()
		}
		else
			label.html(newText)
	})
}) 