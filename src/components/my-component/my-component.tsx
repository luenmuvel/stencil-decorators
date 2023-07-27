import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

function PropCustom() {
  return function(target: any, propertyKey: string) {
    console.log(target, propertyKey);
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    const originalSetter = descriptor.set;
    descriptor.set = function(value: any) {
      if (originalSetter) {
        originalSetter.call(this, value);
      }
    };
    Object.defineProperty(target, propertyKey, descriptor);
  };
}

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
})
export class MyComponent {
  @PropCustom() myProp;
  /**
   * The first name
   */
  @Prop({ mutable: true }) @PropCustom() first: string;

  /**
   * The middle name
   */
  @Prop() middle : string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
