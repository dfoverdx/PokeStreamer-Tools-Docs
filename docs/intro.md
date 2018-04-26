What is it?
===========

Pokémon Soul.Link is a set of tools to aid in the streaming of Pokémon games.

Originally Pokémon Soul.Link was built as a simple improvement to **[EverOddish's PokeStreamer-Tools](https://github.com/EverOddish/PokeStreamer-Tools)** for [Failstream](https://twitch.tv/failstream) who, at the time, was running a Nuzlocke challenge of Pokémon FireRed.  The primary issue with EverOddish's script is that every time a pokémon changed position within the party, it performed a synchronous write of image files to the hard drive (*synchronous* meaning, the game doesn't move on until the operation is complete).  This caused the game--particularly the audio--to lag.

Due to some quirks of the programming of FireRed, this happened at least four times in a row whenever a pokémon was switched out in battle (twice per pokémon), and as a frequent viewer of Failstream's stream, this sound lag drove me crazy.  So, as much as it was a project to help Failstream, it was also a selfish endeavor.

As I'm a solving-interesting-problems-with-code addict <span class="text-muted">(no, really, it's a problem)</span>, this project quickly spiraled out of control.  Eight weeks and ~19000 lines of code later, it's become its own suite of tools, complete with a web GUI.

How it works
------------

Rather than writing image files to the hard drive, Pokémon Soul.Link runs a local [Node.JS](https:nodejs.org) webserver.  The Lua script then sends updates to the server, and the server relays those updates to a webpage which is displayed in your streaming software (OBS Studio, XSplit, etc).  These updates to the server are still synchronous, but take significantly less time than writing files to the hard drive.

All provided features work for both unmodified ROMs and randomized ones.

Features
========

Pokémon Soul.Link's serving of images to your streaming software was just the beginning.

Party Display
-------------

The most important feature, at least for streaming, is the Party Display&trade;.  This provides live updating of the pokémon in your party.  Each slot can display the pokémon's:

*   image, including shiny images, gender-specific images, alternate form images, and eggs
*   species
*   nickname
*   level
*   special styles for when your pokémon has fainted

<div data-modal-images>

![Failstream playing a Nuzlocke Randomizer with the party display](../static/img/nuzlocke-screenshot.png)
![Failstream playing a SoulLink run with the party display](../static/img/soullink-screenshot.png)

</div>

Perhaps most importantly, the layout and styles are completely customizable.  Simple customizations can be done intuitively in the config.  More complex customizations can be set in the `styles` section of the config, which is converted to [CSS](https://www.w3schools.com/css/), or you can provide your own [SASS](https://sass-lang.com/)/CSS files for even more extensibility.

Dashboard
---------

The Dashboard is helpful for running [Nuzlocke](https://bulbapedia.bulbagarden.net/wiki/Nuzlocke_Challenge) and [SoulLink](https://nuzlockefamily.deviantart.com/journal/Soul-Link-Randomized-Nuzlocke-511651842) challenges.  While Pokémon Soul.Link doesn't *enforce* the rules of the challenge, it does track the pokémon you've caught, including where they were caught, whether or not they are shiny, and whether or not they are static encounters.  Further, for SoulLink runs, it keeps track of each pokémon's link.

### Nuzlocke ###

When Nuzlocke is enabled in the config (and SoulLink is disabled), the Dashboard provides a simple method of tracking which pokémon you've caught, where you caught them, and whether they're static or shiny.  It also has a graveyard section that is automatically updated when one of your pokémon die.

### SoulLink ###

When SoulLink is enabled in config, the Dashboard provides the same functionality as the Nuzlocke Dashboard, and on top of that, allows you to manage links between your pokémon and your partner's.  This can be done manually (by picking pokémon species from a drop down), or semi-automatically via server-to-server communication over Discord.

::: alert [me] !star
### SoulLink demo ###

<div class="d-block d-lg-flex flex-lg-row w-100 justify-content-between mb-3">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/NEZfZnoeQfA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <div class="col mt-4 mt-lg-0 align-self-center">
        Everything in this demo was done automatically.  I simply played the games, and all display and linking was taken care of by the software.
    </div>
</div>
:::

Multiple Configurations
-----------------------

The main configuration file, `config.json`, has an option called `configOverride` which is a list of configuration files that overwrite whatever settings are specified in the main file.  This can be helpful if you are running multiple games at once.  For example, if you are running a solo game and a SoulLink game on different days of the week, and thus have two different layouts, you can simply switch between the two layouts by changing one line in `config.json`.

Another application for multiple configurations might be if you are running two SoulLink games with different partners using the [Discord soul linking method](#soullink).  Different config files can specify different Discord settings for each partner.

<div><%= nextBtn('Ready to get started?', 'Begin Setup!', '/setup/') %></div>

Supported Games
===============

**Party display** is supported for generations [III](https://bulbapedia.bulbagarden.net/wiki/Generation_III), [IV](https://bulbapedia.bulbagarden.net/wiki/Generation_IV), and [V](https://bulbapedia.bulbagarden.net/wiki/Generation_V).  Those are the games supported by the original EverOddish scripts, and while I have heavily modified those files, I have not added support for other games, merely extended the current support for those games.

Support for the **Dashboard** is a little hazy, mostly because I haven't tested it on most games.  Also, at the time of writing this documentation, I am fairly sleep-deprived and cannot really remember what will and won't work for various games.

I'm certain that basic Nuzlocke functionality works for gen III games and HeartGold/SoulSilver.  I *think* it will work for the other gen IV games and gen V games..?  I'm 75% confident it will.

For sure, static encounter detection is only available for HeartGold/SoulSilver.  This prevents any sort of automatic-linking for SoulLink runs, but won't prevent you from manually specifying that a pokémon was a static encounter.  It's entirely possible that SoulLink functionality will work in all gen III-V games, but I only know for certain that it works for HeartGold/SoulSilver.

If you try it on another game and a feature doesn't work, it would probably take me a couple hours to enable/fix it for your version (though I'm not guaranteeing that I'll have time to do that work).  If you want to run one of these games, and use Pokémon Soul.Link to do so, contact me on my [Discord server](http://discord.pokemon-soul.link).

Contact
=======

You can contact me on my [Discord server](http://discord.pokemon-soul.link) for help and questions, or to request support for another gen III-V Pokémon game.

##### Found a bug? #####

That's not the least bit surprising to me.  Pokemon Soul.Link is definitely beta-quality code.  Let me know what's going on in the [#bug-reports](https://discord.gg/Rjw9vqQ) channel.


If you find a bug in the Party Display or Dashboard, please include:

*   what generation/game you are playing
*   whether you are using Nuzlocke and/or SoulLink and the SoulLink linking method if applicable
*   a screenshot (see instructions below)
*   a description of what it's doing wrong
*   a description of what it should be doing

If you find a bug in the server or run into a server error (red text), please include:

*   a description (or your best guess) at what you did right before the error occurred so that I can try to reproduce it
*   the generation/game you are playing
*   code-formatted text of the error (see below for how to format code)
*   any other info that might be helpful in debugging the issue, e.g. config settings that might be related

If you find a bug in the Lua script, please include:

*   a description of what went wrong
*   a description of what you think may have caused it so that I can attempt to reproduce it
*   the generation/game you are playing
*   code-formatted text of the error message (if there is one)

:::: alert [secondary] !question
::: details Why is this beta-quality code?
Initially I expected this to be a small one-off project that would take me a couple days, so I didn't write any tests for it.  By the time I realized that this would be a much larger project, it would have been **very** tedious to go back and write tests.  
:::

---

::: details Taking a screenshot
<div class="notes">

*   To take a screenshot of an **entire window**, press <kbd>alt</kbd> + <kbd>prt scr</kbd>.  This will copy the window to the clipboard.

*   <p>To take a screenshot of a <b>portion of the screen</b>, press <kbd><%= fab('windows') %></kbd> + <kbd>r</kbd>, and run <code>snippingtool</code>.  This will copy the area to the clipboard and as well as let you markup the image with highlighting and such.  Then press <kbd>ctrl</kbd> + <kbd>c</kbd> to copy the altered image to the clipboard.</p>

After taking a screenshot, open Discord and paste into the textbox.
</div>
:::

---

::: details Copying error messages from command prompt

To copy a portion of the command prompt's text, click and drag the text you want to copy, and then right-click.

By default, command prompt doesn't let you select text (no idea why).  To enable this, press <kbd>alt</kbd> + <kbd>m</kbd> before clicking and dragging.

:::

---

::: details Formatting code in Discord


If you wrap text in ` ``` ` marks, it makes the code more readable by making the font monospaced and wrapping it in a nice box to clearly indicate what is code and what is your message.

Example:

    Some message text
    ```
    Some code here
    ```

Produces:

<div class="discord-code">

Some message text
```
Some code here
```

</div>

You can also specify the language for the code block if you know it.  For example, if you're copying part of `config.json`:

    These are my nuzlocke settings...
    ```json
    {
        "nuzlocke": {
            "enabled": true
        }
    }
    ```

Produces:

<div class="discord-code">

These are my nuzlocke settings...

```json
{
    "nuzlocke": {
        "enabled": true
    }
}
```

</div>

:::
::::

---

::: alert [me] !star
##### Styling Help #####
If...
*   after you've set up the tool following the [setup instructions](/setup) (to the best of your ability--the instructions might be a little complicated, and, like all software, the tool is subject to the alignment of the stars and whether [Punxsutawney Phil](https://en.wikipedia.org/wiki/Punxsutawney_Phil) saw his shadow last February 2nd), 
*   the layouts provided by the included config files aren't styled the way you'd like, and
*   you can't figure out how to modify the config files to achieve a style that fits your stream layout,

feel free to ping me on Discord; if I have time, I may send you a customized configuration with the styling you want.

:::