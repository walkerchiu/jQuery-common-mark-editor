# jQuery-common-mark-editor

This library implements a CommonMark editor with toolbar functionality that allows users to easily format text using markdown syntax.

## Installation

Import directly in html file.

``` html
<!-- HTML -->

<link href="path/jQuery-common-mark-editor/common-mark-editor.css" rel="stylesheet">
<script src="path/jQuery-common-mark-editor/common-mark-editor.js"></script>
```

## Usage

### Library settings

``` bash
# Edit default style
vi path/jQuery-common-mark-editor/common-mark-editor.css

# Edit default setting
vi path/jQuery-common-mark-editor/common-mark-editor.js
```

### How to use

``` html
<!-- HTML -->

<!-- Add class "WKCME" to your container -->
<div class="WKCME"></div>
```

``` javascript
<!-- JavaScript -->

// Initialize the CommonMark editor
$('.WKCME').WKCME();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
