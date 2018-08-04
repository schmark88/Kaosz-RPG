import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Globals } from 'src/app/globals';
import { PlayerCharacter } from '../../player-character';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.scss']
})
export class ItemBrowserComponent implements OnInit, AfterViewChecked {

  player: PlayerCharacter;
  gold: number;
  silver: number;
  weapons: any;
  armors: any;
  mixed_items: any;
  basket: JSON[] = [];

  constructor(private globals: Globals) {
    this.player = globals.player;
    this.updateMoneyFromPlayer();
    this.weapons = globals.commonItems['weapons'];
    this.armors = globals.commonItems['armors'];
    this.mixed_items = globals.commonItems['mixed_goods'];
    // waepons
    globals.generateArray(this.weapons).forEach(group => {
      globals.generateArray(group.elemek).forEach(element => {
        this.setFinalValues(element);
      });
    });
    // armor
    globals.generateArray(this.armors).forEach(group => {
      globals.generateArray(group.elemek).forEach(element => {
        this.setFinalValues(element);
      });
    });
    // mixed
    globals.generateArray(this.mixed_items).forEach(group => {
      globals.generateArray(group.elemek).forEach(element => {
        this.setFinalValues(element);
      });
    });
    this.basket = new Array<JSON>();
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.updateMoneyFromPlayer();
  }

  updateMoneyFromPlayer() {
    if (this.player != null) {
      const moneyDict = this.globals.convertMoneyToGS(this.player.money);
      this.gold = moneyDict.gold;
      this.silver = moneyDict.silver;
    }
  }

  addToBasket(item) {
    this.basket.push(cloneDeep(item));
  }

  removeFromBasket(item) {
    const index = this.basket.indexOf(item, 0);
    if (index > -1) {
      this.basket.splice(index, 1);
    }
  }

  getBasketPrice() {
    let total = 0;
    this.basket.forEach(element => {
      total += element['finalCost'];
    });
    return total;
  }

  setFinalValues(item) {
    if (item.cost.max){
      item.finalCost = Math.floor((item.cost.max + item.cost.min) / 2);
    } else {
      item.finalCost = item.cost;
    }
    if (item.speed) {
      item.finalSpeed = Math.floor((item.speed.max + item.speed.min) / 2);
    }
    if (item.speed) {
      item.finalStrenght = Math.floor((item.strenght.max + item.strenght.min) / 2);
    }
  }

  setItemValues(item) {
    item.cost = item.finalCost;
    delete item.finalCost;
    item.speed = item.finalSpeed;
    item.strenght = item.finalStrenght;
    delete item.finalSpeed;
    delete item.finalStrenght;
  }

  purchaseBasket() {
    const price = this.getBasketPrice();
    if (price <= this.player.money) {
      this.basket.forEach(element => {
        this.setItemValues(element);
      });
      this.player.items = [...this.player.items, ...this.basket]
      this.player.money -= price;
      this.basket.length = 0;
    }
    console.log(this.player.items)

  }

}
