/**
 * Escape key keyCode
 */
var ESC_KEY = 27;
var ESC_KEY_NAMESPACE = 'rkd-modal-escape';
var isEscKeyEnabled = function() {
    return !window.rkdModal || window.rkdModal.escKey;
};

$(function() {
    var openModal = function($modal) {
        $(document).trigger('rkd-modal:before:open', $modal);

        $modal.addClass('modal-open');
        $modal.find('input.modal-state').prop('checked', true).trigger('change');

        if (isEscKeyEnabled()) {
            $(document).on('keyup.'+ESC_KEY_NAMESPACE, function(e) {
                if (e.keyCode === ESC_KEY) {
                    closeModal($modal);
                }
            });
        }

        $(document).trigger('rkd-modal:after:open', $modal);
    };

    var closeModal = function($modal) {
        $(document).trigger('rkd-modal:before:close', $modal);

        $modal.removeClass('modal-open');
        $modal.find('input.modal-state').prop('checked', false).trigger('change');

        // Remove ESC key listener
        if (isEscKeyEnabled()) {
            $(document).unbind('keyup.'+ESC_KEY_NAMESPACE);
        }

        $(document).trigger('rkd-modal:after:close', $modal);
    };

    // Close modal on close button and clicking outside of modal
    $(document).on("click", ".modal-fade-screen, .modal-close", function() {
        var $modal = $(this).closest('.modal');
        closeModal($modal);
    });

    $(document).on("click", ".modal-inner", function(e) {
        e.stopPropagation();
    });

    // Simple content modal
    $(document).on("click", ".rkd-modal", function(e) {
        e.preventDefault();
        var $modal = $('#'+$(this).data('rkd-modal-id'));
        openModal($modal);
    });

    // Modal ajax link
    $(document).on("click", ".rkd-modal-ajax, .rkd-modal-this", function(e) {
        e.preventDefault();
        var $modal;
        var id = $(this).data('rkd-modal-id');

        // Modal exists?
        if (id) {
            $modal = $('#'+id);
        } else {
            // Create new modal
            $modal = createAjaxModal();

            // Set id so we can have "cache"
            $(this).data('rkd-modal-id', $modal.attr('id'));
        }

        var $loading = $modal.find('.loading');

        // Open modal
        openModal($modal);

        // Take content inside of this element
        if ($(this).hasClass('rkd-modal-this')) {
            // Set loaded content to our modal
            $modal.find('.modal-content').html($(this).html());

            $(document).trigger('rkd-modal:content:loaded', $modal);

            // Hide loader
            $loading.hide();
            return;
        }

        // Check if content is already loaded?
        if ($modal.hasClass('content-loaded')) {
            return;
        }

        var selector = $(this).data('rkd-modal-selector');

        // Show loader
        $loading.show();

        // Make ajax call to current link url
        $.ajax($(this).attr('href'))
            .done(function(data) {
                // If has selector, get wanted content
                if (selector) {
                    data = $(data).find(selector);
                } else if($(data).find('.rkd-modal-content')) {
                    data = $(data).find('.rkd-modal-content');
                }

                // Set loaded content to our modal
                $modal.find('.modal-content').html(data);

                $(document).trigger('rkd-modal:content:loaded', $modal);

                // Add class to specify that content has already been loaded
                $modal.addClass('content-loaded');
            })
            .fail(function() {
                // Request failed
                $modal.find('.modal-content').html('Something went wrong. Please try again later.');
            })
            .always(function() {
                // Hide loader
                $loading.hide();
            });
    });
});

/* Create ajax modal if there is no modal for current link */
var createAjaxModal = function() {
    // Create unique ID
    var ID = '_' + Math.random().toString(36).substr(2, 9);

    var modalHTML = '<div class="modal rkd-modal" id="'+ID+'">' +
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
