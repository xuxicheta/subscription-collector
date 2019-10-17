import { Subscription } from 'rxjs';

interface OnDestroy {
  ngOnDestroy(): void;
}

export class SubscriptionCollector extends Subscription {
  constructor(
    component: OnDestroy,
  ) {
    super();
    const originalNgOnDestroy = component.ngOnDestroy;

    if (!originalNgOnDestroy) {
      throw new Error('You have to implement OnDestroy for SubscriptionCollector can work');
    }

    component.ngOnDestroy = () => {
      originalNgOnDestroy.call(component);
      this.unsubscribe();
    };
  }

  set collect(value: Subscription) {
    this.add(value);
  }
}