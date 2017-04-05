var model = {
	currentCat: null,
	adminView: false,
	cats : [
	{
		clickCount: 0,
		name : 'Tabby',
		imgSrc : 'images/cat2.jpg' 
	},
	{
	   clickCount: 0,
       name : 'Tiger',
       imgSrc : 'images/catclik.jpg'	   
	}
	]	
	};
	
var octopus = {
    init: function() {
		model.currentCat = model.cats[0];	
		catListView.init();
		catView.init();	
	    adminView.init();
	},
	
	getAdminViewinfo: function(){
		return model.adminView;	
	},
	
	setAdminViewtrue: function(){
	   model.adminView = true;
	},
	
	setAdminViewFalse: function(){
		model.adminView = false;
	},
	
	 getCurrentCat: function() {
		return model.currentCat;
	},
	
	getCats: function() {
	    return model.cats;
	},
	
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},
	
	incrementCounter: function() {
	  model.currentCat.clickCount++;
	  if (model.currentCat.clickCount > 100)
	  {
		  model.currentCat.clickCount = 0;
	  }
	  catView.render();	
	},
	
    showHide: function() {
      adminView.render();
    }
	
	};


var catView = {
    init: function() {
	    this.CatElem = document.getElementById('Cat');
	    this.catNameElem = document.getElementById('catName');
	    this.countElem = document.getElementById('clicks');
	    this.catImageElem = document.getElementById('cat-img'); 
		this.catImageElem.addEventListener('click', function(e){
			  octopus.incrementCounter();
	  	  });
		
		this.render();
	 },
	 
	 render: function() {
		 var currentCat = octopus.getCurrentCat();
		 this.countElem.textContent = currentCat.clickCount;
		 this.catNameElem.textContent = currentCat.name;
		 this.catImageElem.src = currentCat.imgSrc; 
	 } 
};
	 
var catListView = {
	init: function() {
          this.catListElement = document.getElementById('cat-list');	 
	      this.render();
	}, 
	
	render: function() {
	 var cat, elem, i;
	 var cats = octopus.getCats();
	 
	 this.catListElement.innerHTML = '';
 	
    for (i = 0; i < cats.length; i++){
		
		cat = cats[i];
	    elem = document.createElement('li');
		elem.textContent = cat.name;
		this.catListElement.appendChild(elem);
		elem.addEventListener('click', (function(catCopy) {
			return function(){
				 octopus.setCurrentCat(catCopy);
				 catView.render();			
			};
		})(cat));
	  };	
	}
};

var adminView = {
init: function(){
      this.adminform  = document.getElementById('details');
	  this.adminButton = document.getElementById('adminb');
      this.formNameElm = document.getElementById('name_lab');
      this.formPicElem = document.getElementById('pic_lab');	
      this.ClickElem = document.getElementById('click_lab');
	  this.CancelElem = document.getElementById('cancel');
	  this.cancSaveblock = document.getElementById('cancsav');
	  this.SaveElem = document.getElementById('save');
      this.render();
},	

render: function(){
	    admininfo = octopus.getAdminViewinfo();      	
        if(admininfo === false)
		{
			this.adminform.style.visibility = 'hidden';
			this.CancelElem.style.visibility = 'hidden';
			this.SaveElem.style.visibility = 'hidden';
		}
		
		if (admininfo === true)
		{
			this.adminform.style.visibility = 'visible';
		    this.CancelElem.style.visibility = 'visible';
			this.SaveElem.style.visibility = 'visible';
		}
	   
		//var elem = this.adminform;
		var catname = this.formNameElm;
        var catpic = this.formPicElem;	
        var catclickcnt = this.ClickElem;
				   
        this.adminButton.addEventListener('click',function() {	
			  var currentCat = octopus.getCurrentCat();
			  catname.value = currentCat.name;
			  catpic.value = currentCat.imgSrc;
			  catclickcnt.value = currentCat.clickCount;
			  octopus.setAdminViewtrue();
			  octopus.showHide();			 
			   })
		
		var cancelbutton = this.CancelElem;
		    cancelbutton.addEventListener('click', function() {		   
   		    octopus.setAdminViewFalse();
			octopus.showHide();
			})
			
	        var saveButton  = this.SaveElem;
		    var nameElement = this.formNameElm;
            var picElement  = this.formPicElem	
		    var clickelement = this.ClickElem
	    
		saveButton.addEventListener('click',function() {
			var currentCat = octopus.getCurrentCat();
			currentCat.name = nameElement.value;
            currentCat.imgSrc = picElement.value;
            currentCat.clickCount = clickelement.value;  		
            octopus.setAdminViewFalse();
			octopus.showHide();
			catView.render();
		})
     }	
};

octopus.init();