import * as orc from '../assets/json/races/ork.json';
import * as elf from '../assets/json/races/elf.json';
import * as human from '../assets/json/races/ember.json';
import * as imp from '../assets/json/races/mano.json';
import * as pusimp from '../assets/json/races/gennymano.json';
import * as gilf from '../assets/json/races/gilf.json';
import * as gnome from '../assets/json/races/gnom.json';
import * as lizardman from '../assets/json/races/gyikleny.json';
import * as ogar from '../assets/json/races/ogar.json';
import * as dwarf from '../assets/json/races/torpe.json';
import * as pixy from '../assets/json/races/tunderke.json';

export class Races{
    static readonly orc = orc;
    static readonly human = human;
    static readonly elf = elf;
    static readonly imp = imp;
    static readonly pusimp = pusimp;
    static readonly gilf = gilf;
    static readonly gnome = gnome;
    static readonly lizardman = lizardman;
    static readonly dwarf = dwarf;
    static readonly pixy = pixy;

    static readonly racesArray: any[] = [
       orc, human, elf, imp, gilf, pusimp, gnome, lizardman, dwarf, pixy, ogar
    ];
}
