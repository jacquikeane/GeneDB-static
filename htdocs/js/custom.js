jQuery(document).ready(function(){

  // Include files
  $('.include-me').each(function(){
    $(this).load($(this).data('location'));
  });

  // Read JSON file to load main content select options
  $.get("data/datasets.json", function( data ){ 
    $.each(data, function(name, values) {

      var output = new Array();

      $.each(values, function(index, value){
        var key = value.genus + ' ' + value.species;
        output.push({ key: key, value: value.common_name});
      });

      output = output.sort(function (a, b) {
          return a.value.localeCompare( b.value );
      });

      select = $('#'+name);

      select.empty();
      select.append('<option value="">Choose...</option>');

      $.each(output, function(key, value) {
        select.append('<option value="' + value.value + '">' + value.key + '</option>');
      });
    });
  });

  // Forward main content selected option to apollo
  $('.select-link').on('change', function(){
    var select = $(this);
    $('.select-link').not(select).val('');
    $('.custom-button').addClass('disabled').attr('href', '#');
    var dataset = select.parent();
    var link = $('a', dataset);
    link.attr('href', 'https://apollo.genedb.org/'+select.val()+'/jbrowse/index.html?tracks=DNA%2CAnnotations%2Cgene%2CmRNA&highlight=');
    if( select.val() != '' ){
      link.removeClass('disabled');
    }

  });
});
