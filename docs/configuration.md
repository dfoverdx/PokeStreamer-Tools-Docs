Configuration
=============

This might seem like a daunting task.  Don't worry.  You're not crazy.  It is.  :Kappa:

The `config.json` file
----------------------

The `config.json` file ((sitting in `/node/`)) contains all the information the server needs to know what kind of run you're doing and how to display the webpage for your streaming software.

There are four main sections you are likely going to edit:

*   `layout`
*   `nuzlocke`
*   `soulLink`
*   `style`

Additionally there are some miscellaneous, somewhat one-off settings.  Oddly, these are the ones we'll tackle first.  Open up `config.json` in a text editor, preferably one that knows how to highlight JSON with comments, say, I don't know... something like [VS Code](http://code.visualstudio.com).

JSON is a pretty intuitive markup language, but if you're unfamiliar with it, click the button below for a quick overview.

<button class="btn btn-outline-me" data-toggle="collapse" data-target="#json-primer">View primer</button>
<div class="collapse card card-light" id="json-primer" markdown="1">
<div class="card-header" markdown="1">
#### The Basics of JSON ####
</div>

<div class="card-body" markdown="1">

```json
{
    // Commented lines -- those starting with "//" -- have no effect.  If you want to disable a setting, 
    //    commenting it out is a common practice.

    // *all* setting names have double quotes around them
    "textSetting": "some text", // text values have double quotes around them
    "numberSetting": 42,        // numbers do not have quotes around them (unless they also contain text)
    "trueFalseSetting": false,  // true/false, also known as boolean values, do not have quotes around them
    "listSetting": [            // lists are denoted by [ and ], and their items are separated by commas
        "textItem",
        123,
        true,
        [ "another", "list" ]
    ],
    "objectSetting": {          // "objects" are denoted by { and }, and for the purposes of config, 
                                // are basically a way organize settings
        "objectTextVal": "some more text"
    }
}
```

For more information, [w3schools](https://www.w3schools.com/js/js_json_syntax.asp) explains the syntax well.
</div>
</div>

The `config.json` document, itself, is pretty well commented, and I'd rather not repeat myself a whole lot, so I'm going to assume you've got the document open.

The miscellaneous settings I'm referring to are:

```json
{
    "useRandomizer": false,
    "configOverride": [
        // ...
    ],
    "emptySlotImagePath": "..."
}
```

The first, I hope, is self explanatory.  If you're running a randomizer, set `useRandomizer` to `true`.  This setting is used to help determine whether a pokémon you've caught was a wild or static encounter.  If you're using a randomizer, obviously it should not be comparing the species with the vanilla species.

#### Multiple configurations ####

The `configOverride` setting is the reason I'm starting with the miscellaneous settings.  This is a list of filenames whose settings will overwrite the ones in `config.json` (as well as `config.advanced.json`, but you probably will never need to touch that).  Files at the top of the list have the highest priority.

The biggest strength to this option, in my opinion, is that if you store all your custom settings in a separate file, you're less likely to screw something up.  If I were you, I'd copy one of the config files (`config.json`, `config.fail.json`, or `config.iipk.json`) and name it something like `config.stormageddon-dark-lord-of-all.json`.  If you're not doing a SoulLink run, copy `config.json`.  Otherwise, choose one of the other two.

[[[light]
Alas, that's all there is for now.  Documentation is taking way longer than I had planned.  I'll get back to it tomorrow.  Or, well, it's 6am.  So later today.
]]

<!-- 
<div class="d-flex w-100 justify-content-around">

</div>

Layout
------
 -->
