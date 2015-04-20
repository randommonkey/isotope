HTMLWidgets.widget({

    name: "isotope",
    type: "output",

    initialize: function(el, width, height) {
        
        $(el).append('<div id="controls"></div>');
        $(el).append('<div id="isotope-items"></div>');
        var iso = new Isotope( '#isotope-items', {
                                itemSelector: '.element-item',
                                layoutMode: 'fitRows',
                                getSortData: {
                                  name: '.name',
                                  symbol: '.symbol',
                                  number: '.number parseInt',
                                  category: '[data-category]',
                                  weight: function( itemElem ) {
                                    var weight = $( itemElem ).find('.weight').text();
                                    return parseFloat( weight.replace( /[\(\)]/g, '') );
                                  }
                                }
                              });
        return({iso: iso})

    },

    resize: function(el, width, height, instance) {


    },

    renderValue: function(el, x, instance) {

        $("#controls").append(x.buttons);
        $("#isotope-items").append(x.items);

// console.log(instance.iso)
// var elems = instance.iso.getItemElements()
// console.log("PRE",elems)
instance.iso.reloadItems();
// var elems = instance.iso.getItemElements()
// console.log("POST",elems)

instance.iso.arrange();

  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    instance.iso.arrange({ filter: filterValue});
  });



  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    instance.iso.arrange({ sortBy: sortByValue });
  });
  
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });


    },
});