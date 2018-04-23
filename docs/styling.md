Styling
=======

Styling Pokémon Soul.Link can be a bit involved, as it requires a lot of guess-and-check between the config, your streaming background image/layout, and building.  Every time you make a change to the config, you need to rebuild in order for those changes to show up.  Fortunately for you, there's a way to build automatically whenever you change the config, with a cleverly named file called `autobuild.cmd`.  We're talking Sherlock Holmes levels of cleverness right there.  :barbSmug:

::: alert [danger] !exclamation-triangle

Do *not* use `autobuild.cmd` when you are streaming.  It is very slow--it's running two servers: the normal one, and one that builds and proxies requests--and is liable to break.  No one wants that, probably.

:::

There are a few things to consider when styling.  Among others:

*   sizing of slots
*   spacing of slots
*   layout of slots (relative to each other)
*   coloring
*   placement and position of text
*   the size, layout, and coloring of your streaming background image

For SoulLink, there's the additional step of placing your partner's image correctly.

While this seems like a lot, I hope I've built a framework that makes it fairly simple without too much effort spent fine-tuning.  

<!-- So, let's get to it.  

Open up your config file.

::: alert [me] !star

Make sure you have SoulLink enabled or disabled as desired.  Even if you are going to be using SoulLink via `discord`, set `linking` to `manual` while you're setting up your styling.  That way you can see the relative placement of the images.

:::

From `node/` run:

```dos
autobuild.cmd
```

Open up your streaming software and create a scene with your background setup up.  Then add a browser source to the scene, pointing to [http://stream.pokemon-soul.link:8081/].
-->

::: alert [secondary]

Before I spend too much time explaining in tedious detail how to how to set up and test your layout against your stream background, I'm going to wait for Failstream to finish his tutorial videos to see what needs further explanation.  (I am really, *really* tired. :gc7Stare:)

:::

## Advanced Styling ##

This bit of text has moved around a bit.  Initially it was cluttering up `config.json`, and then I moved it to the project README.  Now it's here.  Whether it's decipherable or not--well, that's subjective.  :pooFair:

---

The `config.json` file is pretty well-commented on what each style element is used for.  This section of the README explains some of the more advanced things you can do with it by defining your own variables.

If you want to use reference a value defined in the style section in another value, add a $ in front of it.  Any values not prefixed with a `$`, `%`, `@`, or `.` are added as SASS variables and may be used in any later-defined values.  That is, you can define whatever new variables you'd like, though the ones already listed are required.

Example:
```json
{
    "style": {
        "foo": "red",

        "%body": {
            "background": "$foo",
        }
    }
}
```

A more complicated example:
```json
{
    "style": {
        "testing": true,

        "%imageWrapper": {
            "background": "if($testing, red, transparent)"
        },

        "%soulLinkWrapper": {
            "background": "if($testing, red, transparent)"
        }
    }
}
```

You can even define what are known as placeholders (sets of styles, denoted by prefixing the variable with a `%` 
character) and use the `@extend` property within another placeholder to apply the those styles.

Example:
```jsonc
{
    "style": {
        "testing": true,

        "%commonImageWrapperStyle": {
            // if testing, set the background to red, otherwise make a semi-transparent, darkened background
            "background": "if($testing, red, rgba(0, 0, 0, .2))", 
            
            // ... some other shared custom styles ...
        },

        "%imageWrapper": {
            "@extend": "%commonImageWrapperStyle",

            // custom styles for main image wrapper
        },

        "%soulLinkWrapper": {
            "@extend": "%commonImageWrapperStyle",

            // custom styles for SoulLinked image wrapper
        }
    }
}
```

See [https://sass-lang.com/](https://sass-lang.com/) for more information on SASS variables and what you can do with them.