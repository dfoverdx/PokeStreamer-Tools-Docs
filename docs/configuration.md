Configuration
=============

This might seem like a daunting task.  Don't worry.  You're not crazy.  It is.  :Kappa:

The `config.json` file
----------------------

The `config.json` file <span class="text-muted">sitting in `/node/`</span> contains all the information the server needs to know what kind of run you're doing and how to display the webpage for your streaming software.

There are four main sections you are likely going to edit:

*   `layout`
*   `nuzlocke`
*   `soulLink`
*   `style`

Additionally there are some miscellaneous, somewhat one-off settings.  Oddly, these are the ones we'll tackle first.  Open up `config.json` in a text editor, preferably one that knows how to highlight JSON with comments, say, I don't know... something like [VS Code](http://code.visualstudio.com).

JSON is a pretty intuitive markup language, but if you're unfamiliar with it, click the button below for a quick overview.

<button class="btn btn-outline-me" data-toggle="collapse" data-target="#json-primer">View primer</button>
<div class="collapse" id="json-primer" markdown="1">

::: card
#### The Basics of JSON ####

```js
{
    // Commented lines -- those starting with "//" -- have no effect.  If you want to disable a setting, 
    //    commenting it out is a common practice*.

    // *all* setting names have double quotes around them
    "textSetting": "some text", // text values have double quotes around them
    "numberSetting": 42,        // numbers do not have quotes around them (unless they also contain text)
    "trueFalseSetting": false,  // true/false, also known as boolean values, do not have quotes around them
    "emptySetting": null,       // null means the setting exists but doesn't have a value; it has no quotes
    "listSetting": [            // lists are denoted by [ and ], and their items are separated by commas
        "textItem",
        123,
        true,
        null,
        [ "another", "list" ]
    ],
    "objectSetting": {          // "objects" are denoted by { and }, and for the purposes of config, 
                                // are basically a way to organize settings
        "objectTextVal": "some more text"
    }
}

// * The JSON specification doesn't handle comments.  I've used a special loader that ignores them for convenience sake.
//   Commenting out lines of code, in general however, is common practice for langauges that support it.  (Which is 
//   basically all of them.)
```

For more information, [w3schools](https://www.w3schools.com/js/js_json_syntax.asp) explains the syntax well.
:::
</div>

The `config.json` document, itself, is pretty well commented, and I'd rather not repeat myself a whole lot, so I'm going to assume you've got the document open.

The miscellaneous settings I'm referring to are:

```js
{
    "configOverride": [
        // ...
    ],

    "randomizer": {
        "enabled": false,
        "normalizedExp": false,
    },

    "emptySlotImagePath": "..."
}
```

#### Multiple configurations ####

The `configOverride` setting is the reason I'm starting with the miscellaneous settings.  This is a list of filenames whose settings will overwrite the ones in `config.json` (as well as `config.advanced.json`, but you probably will never need to touch that).  Files at the top of the list have the highest priority.

The biggest strength to this option, in my opinion, is that if you store all your custom settings in a separate file, you're less likely to screw something up.  It also makes your config resilient to updates, since updates I make won't overwrite your own changes.  If I were you, I'd copy one of the config files (`config.json`, `config.fail.json`, or `config.iipk.json`) and name it something like `config.stormageddon-dark-lord-of-all.json`.  If you're not doing a SoulLink run, copy `config.json`.  Otherwise, choose one of the other two.

#### Using randomizer ####

If you're running a randomizer, set `randomizer.enabled` to `true`.  This setting is used to help determine whether a pokémon you've caught was a wild or static encounter.  If you're using a randomizer, obviously it should not be comparing the species with the vanilla species.

::: alert [warning] !exclamation

**Static encounter** detection is experimental.  It is currently only supported in HeartGold/SoulSilver.
:::


#### Empty Slot Image Path ####

The last miscellaneous setting indicates the path to the pokéball image that is displayed in empty slots when you don't have a full party.  If you want to change the image, set this path.  If you want to remove it entirely, set the value to `null`.

Layout
------

This is the easiest one and has the largest immediate effect.  This section determines which information elements are placed in which areas of the Party Display slots.  Every element is optional.  If you don't add any elements (and remove the ones there by default), the Party Display will only show images.

The `topElements`, `bottomElements`, `leftElements`, and `rightElements` refer to their position relative to the image.  The `leftElements` and `rightElements` are rotated by default.  To un-rotate them, you must set a style, which we'll get to a little later.  (That said, the `config.json` file that already exists does apply this un-rotation to `level`, which was placed in the `rightElements`.  Failstream didn't like the rotated number.  :failsRage:)

The `imageOverlayElements` are placed atop the image itself.  This is primarily useful for SoulLink runs where space is limited.

Nuzlocke <a id="nuzlocke-config">&nbsp;</a>
--------

The Nuzlocke challenge has a rule that if a pokémon faints, it stays dead.  If you enable nuzlocke in the config, your fainted pokémon images won't return to life when you heal your pokémon (though you can manually revive the images in the Dashboard).

The settings in this section refer to changes that happen when your pokémon faint.  None of the effects will be applied if you set `enabled` to `false`.

::: alert [me] !star
Nuzlocke is enabled by default.
:::

What next?
==========

There are three things you can do from here.  
<div><%= nextBtn(`If things look good and you're not doing a SoulLink...`, `Get to playin'!`, '/usage/') %></div>
<div><%= nextBtn(`If you are playing a SoulLink run with a partner...`, `Setup up SoulLink`, '/setup/configuration/soullink/') %></div>
<div><%= nextBtn(`If you want to customize the look of things...`, `Edit the <code class="text-white">styles</code> config`, '/setup/configuration/styling/') %></div>