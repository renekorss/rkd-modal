$(function() {
  // Open / close modal state
  $(document).on("change", ".modal-state", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  // Close modal on close button and clicking outside of modal
  $(document).on("click", ".modal-fade-screen, .modal-close", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(document).on("click", ".modal-inner", function(e) {
    e.stopPropagation();
  });

  // Simple content modal
  $(document).on("click", ".rkd-modal", function(e) {
    e.preventDefault();
    $('#'+$(this).data('rkd-modal-id')+' input.modal-state').prop('checked', true);
  });

  // Modal ajax link
  $(document).on("click", ".rkd-modal-ajax", function(e) {
    e.preventDefault();
    var $modal;
    var id = $(this).data('rkd-modal-id');

    // Modal exists?
    if(id){
      $modal = $('#'+id);
    }else{
      // Create new modal
      $modal = createAjaxModal();

      // Set id so we can have "cache"
      $(this).data('rkd-modal-id', $modal.attr('id'));
    }

    // Open modal
    $modal.find('input.modal-state').prop('checked', true);

    // Check if content is already loaded?
    if($modal.hasClass('content-loaded')){
      return;
    }

    var $loading = $modal.find('.loading');
    var selector = $(this).data('rkd-modal-selector');

    // Show loader
    $loading.show();

    // Make ajax call to current link url
    $.ajax($(this).attr('href'))
    .done(function(data){
      // If has selector, get wanted content
      if(selector){
        data = $(data).find(selector);
      }

      // Set loaded content to our modal
      $modal.find('.modal-content').html(data);

      // Add class to specify that content has already been loaded
      $modal.addClass('content-loaded');
    })
    .fail(function(){
      // Request failed
      $modal.find('.modal-content').html('Something went wrong. Please try again later.');
    })
    .always(function(){
      // Hide loader
      $loading.hide();
    });
  });
});

/* Create ajax modal if there is no modal for current link */
var createAjaxModal = function(){
  // Create unique ID
  var ID = '_' + Math.random().toString(36).substr(2, 9);

  var modalHTML = '<div class="modal" id="'+ID+'">' +
      '<input class="modal-state" type="checkbox" />' +
      '<div class="modal-fade-screen">' +
        '<div class="modal-inner">' +
          '<!-- Close button-->' +
          '<div class="modal-close"></div>' +
          '<!-- Loader -->' +
          '<div class="sk-three-bounce loading">' +
            '<div class="sk-child sk-bounce1"></div>' +
            '<div class="sk-child sk-bounce2"></div>' +
            '<div class="sk-child sk-bounce3"></div>' +
          '</div>' +

          '<!-- Content will be loaded in here with AJAX -->' +
          '<div class="modal-content"></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  // Add to document
  $('body').append(modalHTML);

  return $('#'+ID);
};