# Tips

This's a somewhat brief tips document on how to get up and running quickly. That said, it does not go into the nuances of how hugo works. For more details, [please see the docs](https://gohugo.io/content-management/organization/).

> If you need to make changes from a text editor, edit files in the **content** directory and add media file in the **static/images** directory. Else, use forestry.io for editing.

[Here is another useful resource to understand hugo's directory structure](https://gohugo.io/getting-started/directory-structure/)

## Edit the pages
To edit this site, you will use **[markdown](https://www.makeuseof.com/tag/printable-markdown-cheat-sheet/)** and **[shortcodes](https://gohugo.io/content-management/shortcodes/)**.

Why shortcodes? While markdown is sufficient to produce simple pages, it's insufficient where complex page structures are needed. Thusly, whenever we need special styling, shortcodes compliment the shortcomings of markdown.

Shortcodes use either `{{% %}}` or `{{< >}}` as the *opening tags*. The former are used if the immediate content is markdown, while the latter is used whenever the immediate content is something else. 

Sometimes, the shortcode will wrap content, sometimes it won't. When content is wrapped, a closing shortcode tag is needed. Please see the link I provided above and the markdown files for examples. You'll get the gist pretty quickly.

I've setup the following shortcodes.

1. Video
2. Row
3. Column
4. Form
5. Button
6. Block
7. Partial

### 1. Video
This allows you to embed a youtube video in you content. You would achieve that using a positional parameter (needs no name )parameter, like so:

**Example:**
```markdown
{{< video "xWF59rWSceA" >}}
<!-- Use the youtube video id -->
```

### 2. Row 
Some times you want to include several columns horizontallt stacked besides each other. At the time of this writing, you can only include a maximum of 3 columns. This shortcode takes named parameters:

| PARAMETER | PURPOSE | OPTIONAL |
| :---  | :--- | :--- |
| columns | number of columns <= 3 | no |
| image | a background image | yes |
| size | the size of the background image. use *0 ~ 100%*, *cover*, or *contain*  | yes |
| position | position of the background image. use *bottom*, *top*, *right*, *left*. These values can be used in pairs | yes |
| top | top padding . use integer values within the range of `1~6`|  yes |
| bottom | bottom padding. same values as `top` above | yes |
| padding | both top and bottom padding. same values as `top` above | yes |
| class | this is a nuclear option. Define a css class and special all the above attributes in it. That way, you can use a single parameter while being more specific | yes |

**Example**
```markdown
{{< row columns="2" image="bg-bubble.png" padding="6" class="intro" >}}
  <!-- wrap your columns in here -->
{{< /row >}}
```

Alternatively

**Example 2**
```markdown
{{< row class="intro" >}}
  <!-- wrap your columns in here -->
  <!-- a 'intro' class will be added to this row -->
  <!-- in your css, you can style that class as your fancy -->
{{< /row >}}
```

### 3. Column
| PARAMETER | PURPOSE | OPTIONAL |
| :---  | :--- | :--- |
| fullWidth | makes a column occupy the entire width of its parent row | yes |
| align | vertically center align contents in a column | yes |
| center | center the text inside a column | yes |

**Example**
```markdown
{{% column fullWidth="true" align="true" center="true" %}}
<!-- write you markdown content inside. Don't ident, unless where markdown's syntax requires you to -->
{{% /column %}}
```

### 4. Form 
It accepts 4 named parameters, all of which are optional. When any of those are not specified, the values in **data/subscribe.yml** file are used.

| PARAMETER | PURPOSE | OPTIONAL |
| :---  | :--- | :--- |
| title | form title | yes |
| name | name field placeholder | yes |
| email | email field placeholder | yes |
| action | send button text label | yes |

**Example**
```markdown
{{< form >}}
<!-- the default values are used -->
```

Alternatively

**Example 2**
```markdown
{{< form title="de apple coach nieuwsbrief" action="send" name="John Appleseed" email="some@fancy.email" >}}
```

### 5. block
This adds a self-contained (need not be wrapped inside a row) column-like block of text.

| PARAMETER | PURPOSE | OPTIONAL |
| :---  | :--- | :--- |
| position | position of the background image. use *bottom*, *top*, *right*, *left*. These values can be used in pairs | yes |
| top | top padding . use integer values within the range of `1~6`|  yes |
| bottom | bottom padding. same values as `top` above | yes |
| padding | both top and bottom padding. same values as `top` above | yes |
| center | center the text inside a block | yes |

**Example**
```markdown
...
{{% block center="true" top="2" %}}
### IS APPLE SOMS EEN MYSTERIE VOOR JOU?
{{% /block %}}
...
```

### 6. Button
This adds a styled link (styled like a button). It takes two no-optional parameters:

| PARAMETER | PURPOSE | OPTIONAL |
| :---  | :--- | :--- |
| label | button text | no |
| url | button link | no |

**Example**
```markdown
...
{{< button url="/" label="doe nu mee" >}}
...
```

### 7. Partial
Sometimes you may want to drop a given [template](https://gohugo.io/templates/partials/#readout) file somewhere within a content file. You can do that using a positional parameter, like so:

```markdown
...
{{< partial "tips" >}}
<!-- this include layouts/partials/tips.html in the content file (page) -->
...
```

## Create pure HTML pages

In response to [issue #10](https://github.com/onweru/apple/issues/10), you can now author pure html pages. At the time of this writing, these pages will only depend on [this template](/layouts/pure/single.html). 

To author such pages, simply include a type field inside the front matter of the page you are about to author:

```markdown
---
...
type: pure
...
---
<!-- Paste html code here -->
```
