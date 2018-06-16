import * as orc from "./json/races/ork.json"
import * as elf from "./json/races/elf.json"
import * as human from "./json/races/ember.json"
import * as imp from "./json/races/gennymano.json"
import * as gilf from "./json/races/gilf.json"
import * as gnome from "./json/races/gnom.json"
import * as lizardman from "./json/races/gyikleny.json"
import * as ogar from "./json/races/ogar.json"
import * as dwarf from "./json/races/torpe.json"
import * as fairy from "./json/races/tunderke.json"

export class Races{
    static readonly orc = orc;
    static readonly human = human;
    static readonly elf = elf;
    static readonly imp = imp;
    static readonly gilf = gilf;
    static readonly gnome = gnome;
    static readonly lizardman = lizardman;
    static readonly dwarf = dwarf;
    static readonly fairy = fairy;

    static readonly racesArray: any[] = [
       orc,human,elf,imp,gilf,gnome,lizardman,dwarf,fairy,ogar
    ]
}