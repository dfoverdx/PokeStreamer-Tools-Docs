Build
=====

Let's build with the default configuration and see what we've got before diving into what you can change.  

First, we need to tell the Lua scripts what version of the game you're running.  Open up `/lua/game_version.lua`.  It should look something like this:

```lua
--for different game versions
-- 1 = Ruby/Sapphire U, 2 = Emerald U, 3 = FireRed/LeafGreen U, 4 = Ruby/Sapphire J, 5 = Emerald J (TODO), 
-- 6 = FireRed/LeafGreen J (1360)
local gen3_game = 3

--0: Ruby/FireRed, Emerald
--1: Sapphire/LeafGreen
local gen3_subgame = 0

-- 1 = Diamond/Pearl, 2 = HeartGold/SoulSilver, 3 = Platinum, 4 = Black, 5 = White, 6 = Black 2, 7 = White 2
local gen4_gen5_game = 2

-- 1 = Diamond, HeartGold, Platinum, Black, white, Black 2, White 2
-- 2 = Pearl, SoulSilver
local gen4_gen5_subgame = 1
```

I'm not going to lie; if you can't figure out what to do here, you should probably seek professional help. :barbShots::barbFired: 

Set the proper values, save, and exit.

<div class="alert alert-xsplit d-flex flex-row align-items-center">
<div class="left-icon">
<%= require('../static/img/xsplit-icon.svg') %>
</div>

::: details An Extra Step for XSplit Users

As of the writing of this documentation (April 2018), there is a bug in XSplit that requires you to set one setting toward the bottom of `/node/config.json`.

```jsonc
{
    "server": {
        "useLessSecureAPI": true
    }
}
```

Just set that value to `true`, save, and quit.
:::
</div>

Now `cd` into `/node/` if you aren't already there and run

```dos
build.cmd
start startServer.cmd
```

::: alert [me] !star
##### A couple notes #####

<div class="notes">

1.  The `start` in the `start startServer.cmd` command is optional.  It simply makes the server run in a separate command prompt window, which will be helpful later when we want to run other commands without closing the server.

    If you do run the server without `start` and want to stop the server without closing the window, press <kbd>ctrl</kbd> + <kbd>c</kbd> twice.

2.  Running `build.cmd` updates the Party Display and Dashboard files.  It does not affect the server.  If you happen to be making a change that only affects the server (e.g. the `randomizer` settings), you do not need to rebuild.

</div>
:::

After building and running the server, your Party Display will now be hosted at [http://stream.pokemon-soul.link:8081/](http://stream.pokemon-soul.link:8081/).

<div data-modal-images>

![Empty default Party Display](../static/img/default-party-display.png)

</div>

You should have something that looks like this.  If you don't, something went wrong.  In fact, I'd go so far as to say the world is about to end and it's *all your fault*.  Just speakin' truth, man.  :failsFish:

:::: alert [secondary] !question

::: details If you are having troubles at this point...

Close the window that opened when you ran `start startServer.cmd`, and then run:

```dos
git reset --hard HEAD
git clean -f
rmdir /s /q public
npm i
build.cmd
start startServer.cmd
```

Now refresh your browser.
:::
::::

Let's put something other than PokéBalls&trade; up there.

1.  Open up your emulator
2.  Load your Pokémon ROM
3.  Click Tools / Lua Scripting / New Lua Script Window
4.  Click Browse...
5.  Find the `/lua` directory in the cloned repository and open either `auto_layout_gen3.lua` or `auto_layout_gen4_gen5.lua` depending on which game you're running.

::: alert [danger] !exclamation-triangle
Do **not** use `auto_layout_gen*_soul_link.lua`, even if you are set up to run SoulLink.  The scripts I've modified are the basic ones.  I only left the `*_soul_link.lua` scripts in there so the other scripts wouldn't get lonely.
:::

Load a game or a save state or start a new game and play until you pick your first pokémon.

<div data-modal-images>

![Default Party Display after catching a pokémon](../static/img/one-pokemon-party-display.png)

</div>


If that's good enough for you, great!  Open up OBS Studio or XSplit, add a Browser Source, point it to [http://stream.pokemon-soul.link:8081](http://stream.pokemon-soul.link:8081), slap it on top of a blue background so the text shows up nice, and you're set!  Nuzlocke is enabled by default, so you can open up [http://stream.pokemon-soul.link:8081/dashboard](http://stream.pokemon-soul.link:8081/dashboard) to keep track of the pokémon you've caught (there's also a shortcut in the `/node` directory).  Happy training!

<div><%= nextBtn(`Let's get`, 'Configuring','/setup/configuration') %></div>