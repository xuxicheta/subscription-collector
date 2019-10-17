# SubscriptionCollector

### How to use it in Angular

Look at typical component

```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit, OnDestroy {
  private sc = new SubscriptionCollector(this);
  
  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.sc.collect = this.userSubscription();
  }
  
  ngOnDestroy() { }
  
  private userSubscription(): Subscription {
    return this.route.params.pipe(
      switchMap(params => this.userService.getUser(params.userId),
      switchMap(user => this.postsService.getPosts(user.userId),
    )
      .subscribe()
  }
```

When you assing new subscription to `this.sc.collect` SubscriptionCollector take this subscription and add to accumulating subscription under the hood.

When ngOnDestroy calls accumulating subscription unsubscribes.

Implementation of OnDestroy is required.


Why use it?
No more constructions like 
```typescript
ngOnDestroy() {
  if (this.myPrettySubscription1) {
    this.myPrettySubscription1.unsubscribe();
  }
  if (this.myPrettySubscription2) {
    this.myPrettySubscription2.unsubscribe();
  }
}

```

