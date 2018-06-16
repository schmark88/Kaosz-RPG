import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function rangeF(range: Array<number>): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const v: number = control.value;
    return v >= range[0] && v <= range[1] ? null : {actualValue: v, requiredValue: range, range: true};
  };
}

export function rangeP(base: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const v: number = control.value;
    const range = [base * 0.8, base * 1.2];
    return v >= range[0] && v <= range[1] ? null : {actualValue: v, requiredValue: range, range: true};
  };
}

@Directive({
  selector: '[appRange]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appRange') range: [number];

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.range ? rangeF(this.range)(control)
                              : null;
  }
}

@Directive({
  selector: '[appPercentRange]',
  providers: [{provide: NG_VALIDATORS, useExisting: PercentRangeValidatorDirective, multi: true}]
})
export class PercentRangeValidatorDirective implements Validator {
  @Input('appPercentRange') base: number;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.base ? rangeP(this.base)(control)
                              : null;
  }
}
/** A hero's name can't match the given regular expression 
export function minmaxValidator(value: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value > value.max) {
        return {'valueTooHigh': {value: control.value}};
    }
    if (control.value < value.min) {
        return {'valueTooHigh': {value: control.value}};
    }
    return null;
  };
}

@Directive({
  selector: '[appMinmax]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinmaxValidatorDirective, multi: true}]
})
export class MinmaxValidatorDirective implements Validator {
@Input() value: any;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return  minmaxValidator(this.value)(control)
                             ;
  }
}
*/