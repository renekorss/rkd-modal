[![Actions Status](https://github.com/renekorss/rkd-modal/workflows/build/badge.svg)](https://github.com/renekorss/rkd-modal/actions)
[![npm version](https://badge.fury.io/js/rkd-modal.svg)](https://badge.fury.io/js/rkd-modal)
[![npm](https://img.shields.io/npm/dt/rkd-modal.svg)](https://www.npmjs.com/package/rkd-modal)
[![Known Vulnerabilities](https://snyk.io/test/github/renekorss/rkd-modal/badge.svg?targetFile=package.json)](https://snyk.io/test/github/renekorss/rkd-modal?targetFile=package.json)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

# RKD Modal
Plain content and AJAX supported modal.

# Install

`npm install rkd-modal`

# How to use?

See [example HTML](src/example/index.html) and [JSFiddle](https://jsfiddle.net/ReneKorss/m3vLr09u/).

## AJAX modal

**Create a link to modal**

````html
<a
    href="https://cors.io/?http://example.com/"
    class="rkd-modal-ajax"
    data-rkd-modal-selector="p"
>Open ajax modal</a>
````

That's it!

### Options

`data` attributes:

- `data-rkd-modal-selector` (optional): jQuery selector which content will be loaded from requested URL.

## Content modal with current item contents

````html
<a href="#" class="rkd-modal-this">This content will be displayed in modal</a>
````

## Content modal

**Create a link to modal**

````html
<a href="#" class="rkd-modal" data-rkd-modal-id="modal-content">Open simple content modal</a>
````

**Add modal to source**

````html
<!-- Content modal -->
<div class="modal" id="modal-content">
    <input class="modal-state" type="checkbox" />
    <div class="modal-fade-screen">
        <div class="modal-inner">
            <div class="modal-close"></div>
            <h1>Modal Title</h1>
            <p class="modal-intro">Intro text</p>
            <p class="modal-content">Body text</p>
        </div>
    </div>
</div>
````

### Options

`data` attributes:

- `data-rkd-modal-id` (required): custom modal ID. Must be unique.

# Events

**Possible events:**

- `rkd-modal:before:open`
- `rkd-modal:after:open`
- `rkd-modal:before:close`
- `rkd-modal:after:close`
- `rkd-modal:content:loaded`

Events are fired on `$(document)` object, so listen like this:

````javascript
$(document).on('rkd-modal:before:open', function(e, $modal) {
    // Do whatever you need
    // $modal is jQuery object representing current modal
});
````

# Configure what actions closes modal

Just create `window.rkdModal` global object and set config as you wish.

````javascript
window.rkdModal = {
    escKey: false, // Disable/enable ESC key from closing modal. Default: true
    backgroundClickClose: false // Disable/enable background click from closing modal. Default: true
};
````

It gets validated on every modal open, so you could change these settings whenever you need.

# Customise

You can override any CSS (SCSS) you need to make it your own.

# License

[MIT](LICENSE)
