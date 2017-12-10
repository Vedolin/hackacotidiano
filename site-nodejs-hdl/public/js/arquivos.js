jQuery(function($) {
    $('input[type="file"]').change(function() {
      if ($(this).val()) {
           var filename = $(this).val();
           $(this).closest('.form-group').find('.arquivos').html("Arquivos selecionados!");
      }
    });
  });