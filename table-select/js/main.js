/*下拉框 change事件*/
$('body').on('change', '.select-plan', function(){
	var type = $(this).val()
	var $typeContainer = $(this).parent('.select-div-box')
	$typeContainer.find('.plan-box').hide()
	if(type == 1){
		$typeContainer.find('.xj-set-box').show()
	}
	if(type == 2){
		$typeContainer.find('.coupon-set-box').show()
		$typeContainer.find('.selected-coupon-box').show()
	}
	if(type == 3){
		$typeContainer.find('.gift-set-box').show()
		$typeContainer.find('.selected-gift-box').show()
	}
})


//全选、全取消
$('#addAllCoupon').on('change', function(){
    if($(this).prop('checked')){
        $('#couponListTable tbody input[type=checkbox]:not(:checked)').click();
    }else{
        $('#couponListTable tbody input[type=checkbox]:checked').click();
    }
})

$('#addAllGift').on('change', function(){
    if($(this).prop('checked')){
        $('#giftListTable tbody input[type=checkbox]:not(:checked)').click();
    }else{
        $('#giftListTable tbody input[type=checkbox]:checked').click();
    }
})

//单行勾选 , 自动全部勾选
$('body').on('change', '.add-coupon-check', function(){	
    if($(this).prop('checked')){
        if($('#couponListTable tbody input[type=checkbox]').length == $('#couponListTable tbody input[type=checkbox]:checked').length){
            $('#addAllCoupon').prop('checked', true);
        }
    }else{    	
        $('#addAllCoupon').prop('checked', false);
    }
})

$('body').on('change', '.add-gift-check', function(){	
    if($(this).prop('checked')){
        if($('#giftListTable tbody input[type=checkbox]').length == $('#giftListTable tbody input[type=checkbox]:checked').length){
            $('#addAllGift').prop('checked', true);
        }
    }else{    	
        $('#addAllGift').prop('checked', false);
    }
})

/*****************************************卡券选择****************************************************/
var $addCouponBtn = ''
$('body').on('click', '.add-coupon', function(){
	$addCouponBtn = $(this)

	//从addCouponBtn上获得当前绑定数据，显示在对话框的checkbox
	var ids = $addCouponBtn.attr('data-id') ? $addCouponBtn.attr('data-id').split(',') : []
	$('.add-coupon-check').each(function(index, obj){
		var checkId = $(this).val()
		if(ids.indexOf(checkId) >= 0){
			//在
			$(this).prop('checked', true);
		}else {
			//不在
			$(this).prop('checked', false);
			$('#addAllCoupon').prop('checked', false);
		}
	}) 

	//手动打开模态对话框
	$('#couponModal').modal('show')
})

//卡券 确定按钮
$('#confirmCoupon').click(function(){
	//收集选中数据
	var selectedIds = []
	var selectedNames = []
	$('.add-coupon-check:checked').each(function(index, obj){
		var id = $(this).val()
		selectedIds.push(id)
		var name= $(this).attr('data-name')
		selectedNames.push(name)

	//	var selectedObj = {"id": id, "name": name}    //obj["id"] = id		
	//	selectedList.push(selectedObj)
	})

	//更新页面显示，已选中数量，选中名称
	$addCouponBtn.parents('.coupon-set-box').prev('.selected-coupon-box').empty()
	$addCouponBtn.prev().children('.selectCouponNum').text(selectedIds.length)
	for(var index in selectedNames){
		var nameHtml = '<span class="selected-name">'+ selectedNames[index] +'</span><br>'
		$addCouponBtn.parents('.coupon-set-box').prev('.selected-coupon-box').append(nameHtml)
	}

	//绑定数据到外部对应btn
	$addCouponBtn.attr('data-id', selectedIds.join(','))

	//关闭模态对话框 (手动)
	$('#couponModal').modal('hide')

})
/*********************************************end*****************************************************/


/*****************************************赠品选择****************************************************/
var $addGiftBtn = ''
$('body').on('click', '.add-gift', function(){
	$addGiftBtn = $(this)

	//从addGiftBtn上获得当前绑定数据，显示在对话框的checkbox
	var ids = $addGiftBtn.attr('data-id') ? $addGiftBtn.attr('data-id').split(',') : []
	$('.add-gift-check').each(function(index, obj){
		var checkId = $(this).val()
		if(ids.indexOf(checkId) >= 0){
			//在
			$(this).prop('checked', true);
		}else {
			//不在
			$(this).prop('checked', false);
			$('#addAllGift').prop('checked', false);
		}
	}) 

	//打开对话框
	$('#giftModal').modal('show')
})

$('#confirmGift').click(function(){
	//1.收集数据
	var selectedIds = [], selectedNames = []
	$('.add-gift-check:checked').each(function(index, obj){
		var id = $(this).val()
		var name = $(this).attr('data-name')
		selectedIds.push(id)
		selectedNames.push(name)
	})

	//2.更新页面显示
	$addGiftBtn.parents('.gift-set-box').prev('.selected-gift-box').empty()
	$addGiftBtn.prev().children('.selectGiftNum').text(selectedIds.length)   //数量
	for(var index in selectedNames){
		var nameHtml = '<span class="selected-name">'+ selectedNames[index] +'</span><br>'
		$addGiftBtn.parents('.gift-set-box').prev('.selected-gift-box').append(nameHtml)
	}

	//3.绑定数据到对应的选择按钮
	$addGiftBtn.attr('data-id', selectedIds)

	//4.关闭对话框
	$('#giftModal').modal('hide')
})
/*****************************************end****************************************************/


/******************************新增一行****************************************************/
$('#addNew').click(function(){
	var tbLength = $('#proTable tbody tr').length;
	var trHtml =  '<tr>'+
				 '<td>'+ (tbLength + 1) +'</td>' +
				 '<td>运动鞋'+ (tbLength + 1) +'</td>' + 
				 '<td>'+ (6655321 + tbLength + 1) +'</td>' +
				  
				 '<td>'+
				  	'<div class="inline select-div-box">'+
				  		'<select name="doSome" id="" class="inline select-plan">'+
				  			'<option value="">请选择</option>'+
				  			'<option value="1">减免现金</option>'+
				  			'<option value="2">选择卡券</option>'+
				  			'<option value="3">选择赠品</option>'+
				  		'</select>'+
				  		'<div class="inline plan-box xj-set-box" style="display:none">'+
				  			'<input type="text" class="inline" type="number" maxlength="5" placeholder="5位以内整数">'+
				  			'<label>元</label>'+
				  		'</div>'+

				  		'<div class="inline plan-box selected-coupon-box" style="display:none;"></div>'+
				  		'<div class="inline plan-box coupon-set-box" style="display:none">'+
				  			'<span>已选<span  class="selectCouponNum">0</span>张卡券</span>'+
				  			'<button class="btn btn-primary add-coupon">请选择卡券</button>'+
				  		'</div>'+

				  		'<div class="inline plan-box selected-gift-box" style="display:none;"></div>'+
				  		'<div class="inline plan-box gift-set-box" style="display:none">'+
				  			'<span>已选<span class="selectGiftNum">0</span>件赠品</span>'+
				  			'<button class="btn btn-primary add-gift">请选择赠品</button>'+						
				  		'</div>'+
				  	'</div>'+			
				 '</td>'+

				 '</tr>'

	$('#proTable tbody tr').last().after(trHtml)			 
})


$('#saveData').click(function(){
	var dataList = []
	$('#proTable tbody tr').each(function(index, obj){
		//level type data-id
		var trData = {}
		var level = $(this).children().first().text()
		var type = $(this).find('.select-plan').val()
		
		var dataId = ''
		if(type == 1){
			dataId = $('#cash').val()		
		}else if(type == 2){
			dataId = $(this).find('.add-coupon').attr('data-id')			
		}else if(type == 3){
			dataId = $(this).find('.add-gift').attr('data-id')		
		}

		trData =  {"level-id": level, "type": type, "data": dataId}
		dataList.push(trData)
	})
	
	console.log(dataList)

})