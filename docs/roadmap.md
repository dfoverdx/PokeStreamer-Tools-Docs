Roadmap
=======

I have no idea if I'll ever get around to implementing any these features, as I've already spent *way* too much time on this project at the expense of many of my real life responsibilities, but I may eventually add:

#### Nuzlocke ####

*   A graveyard display page (I've already begun this, but haven't decided whether to finish it)
*   Ensure support for all gen III-V games
*   Additional fun-to-have death animations/styles

#### SoulLink ####

*   Ensure/enable support for gen III-V games
*   Detect when a SoulLinked pokémon is not in your partner's party in order to show the pokemon as invalid in the Party Display
*   Automated deaths between SoulLinked pokémon (~25% done for gen IV/V games)
    -   *Maybe* automated linked status effects (e.g. suddenly: *poisoned!*)
*   SoulLinking via a web proxy rather than using Discord
*   Better support for automatic linking (linking shiny pokémon based on the order they were caught, fixing bugs of existing automatic linking, etc)

#### Configuration and Game Management ####

It might be helpful to provide a UI for basic configuration setup.

Additionally, running multiple games at once (e.g. different SoulLink partners on different days) currently requires the manual renaming of data files to switch back and forth between games.  Switching games could be managed with a dropdown.

#### Chat Interactivity ####

Almost certainly I will never implement these, but they would be fun.

*   Use bits or stream-specific "currency" to purchase in-game effects (what I'd call *Hunger Games Sponsor mode*)
    -   Heal the current pokémon
    -   Heal the whole team
    -   Restore PP to the current pokémon
    -   Add item to inventory
    -   Or, if you're a masochist <span class="text-muted">(*cough*<span class="text-dark">FAIL</span>*cough*)</span> and want to *fight against* chat, they might purchase the death of one of your pokémon or to apply a status effect at an inopportune moment
*   Use voting to select what pokémon appears in the next wild encounter

#### Additional Generation Support ####

It may be nice to support gen VI and VII games, but that will likely rely on someone else writing the Lua scripts, as I really have no idea how to search for things in game memory.  The extensions to the Lua scripting I *have* done have relied heavily on the existing scripts, and I've had little success finding other positions, such as where Bill's PC is (it seems to move around when you start a new game).  They've also relied on Bulbapedia's information on the pokémon's data structure; pages corresponding to gen VI and VII games don't yet exist.