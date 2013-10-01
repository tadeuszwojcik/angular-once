angular-once
=====================

One time bindings for AngularJS.
## Why?

AngularJS is a great framework with many superb features, but when is used to display large amount 
of data can become quite slow due to it's binding mechanism.

When you bind data via `{{ }}` or `ng-bind` directives, 
angular sets up `$watch` under the cover which is being executed every time angular event loop triggers (for example after `$http` request, or keypress).
It's fine when number of bindings (pieces of information you want to display) is relatively small up to few hundreds,
but when that number increases page can become unresponsive expecially on low-end devices
(it was Surface RT in my case, and reason to create that project, it was painfully slow even for 200 bindings).

There isn't much you can do about it except displaying less data (via paging for example), but it's not always the case.
Should we wait till browsers implement [`Object.observe`](http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe) and AngularJS 
will used it so we get [40x speed-up](https://mail.mozilla.org/pipermail/es-discuss/2012-September/024978.html)?
We could, but when your data is readonly (and in many cases is) you can use this project which sets up once time bindings 
and doesn't create any watchers so is incredibly **fast**!

**bottom line: If you use AngularJS, have performance issues and need to display lots of readonly data, this project is for you!**




## Installation

```sh
$ bower install angular-once
```

or copy once.js file to your project and reference it.

## Usage

Lets look at this standard AngularJS code snippet:

```html
<ul>
	<li ng-repeat="user in users">
	  <a ng-href="/user/{{user.id}}">{{ user.name }}</a>
		<a ng-href="/user/{{user.id}}"><img ng-src="{{user.avatarUrl}}"></a>
		<div ng-class="{'formatted': user.description}" ng-bind="user.description"></div>
	</li>
</ul>
```

Now given 100 users, it's 600 watchers and list is not only information on page in most cases.
If users information needs to be only displayed, not edited inline we don't need to set up watchers in `ng-repeat` directive,
especially as user goes back and forward withing an app many times, list is refreshed on each display as controller in angular ar transient.

Let's look at the same example using **angular-once**:
```html
<ul>
	<li ng-repeat="user in users">
	  <a once-href="/user/{{user.id}}" once-text="user.name"></a>
		<a once-href="/user/{{user.id}}"><img once-src="{{user.avatarUrl}}"></a>
		<div once-class="{'formatted': user.description}" once-bind="user.description"></div>
	</li>
</ul>
```
Number of watchers? **0** (actually 1 as angular uses separate watch for ng-repeat directive itself).


## API

List below contains comparison of angular-once directives ( **one time bindings** ) with  build in angular directives ( **two-way bindings** ).

One important thing to note is that when using 'angular-once' and binded data is `undefined` it creates watch which waits till data is available (promise is resolved)
and then remove that watch itself. Reason for that is to be able to use it with data which is not yet available, but still readonly.

| 	angular-once | native angular equivalent  | example usage  |
| ------------- |:-------------:| -----:|
| `once-if = "condition"`     | `ng-if`  |`<ANY once-if="user.isAdmin"></ANY>`|

## Credits
Thanks both to @Pasvaz for bindonce and @abourget for $watch fighters, as both modules were inspiration and starting point for creating this module.

## Similar projects
* [bindonce](https://github.com/Pasvaz/bindonce) - similar, but requires addtional bindonce directive which wraps other dindonce directives.
* [watch fighters](https://github.com/abourget/abourget-angular) - similar, but doesn't handle case when there is no data yet to bind, simply binds nothing, so doesn't work with promises.

## License
  [WTFPL](LICENSE.txt)
