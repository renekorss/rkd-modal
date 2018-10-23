# RKD Modal
Plain content and AJAX supported modal.

# Install

`npm install rkd-modal`

# How to use?

See [example HTML](src/example/index.html) and [JSFiddle](https://jsfiddle.net/ReneKorss/m3vLr09u/).

### AJAX modal

**Create a link to modal**

````html
<a
  href="https://cors.io/?http://example.com/"
  class="rkd-modal-ajax"
  data-rkd-modal-selector="p"
>Open ajax modal</a>
````

That's it!

#### Options

`data` attributes:

- `data-rkd-modal-selector` (optional): jQuery selector which content will be loaded from requested URL.

### Content modal with current item contents

````html
<a href="#" class="rkd-modal-this">This content will be displayed in modal</a>
````

### Content modal

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

#### Options

`data` attributes:

- `data-rkd-modal-id` (required): custom modal ID. Must be unique.

# Customise

You can override any CSS (SCSS) you need to make it your own.

# License

[MIT](LICENSE)