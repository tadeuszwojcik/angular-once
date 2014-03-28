angular-once
=====================

One time bindings for AngularJS.
## Why?

AngularJS is a great framework with many superb features, but when is used to display large amount 
of data, it can become quite slow due to it's binding mechanism.

When you bind data via `{{ }}` or `ng-bind` directives, 
angular sets up `watch` under the cover which is being executed every time angular event loop triggers (for example after `$http` request, or keypress).
It's fine when number of bindings (pieces of dynamic information you want to display) is relatively small up to few hundreds,
but when that number increases page can become unresponsive expecially on low-end devices
(it was Surface RT in my case, and reason to create that project, it was painfully slow even for 200 bindings).

There isn't much you can do about it, except displaying less data (via paging for example), but it's not always the case.
Should we wait till browsers implement [`Object.observe`](http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe) and AngularJS 
will used it so we get [40x speed-up](https://mail.mozilla.org/pipermail/es-discuss/2012-September/024978.html)?
We could, but when your data is readonly (and in many cases is) you can use this project which sets up one time bindings 
and doesn't create any watchers so is incredibly **fast**!

**bottom line: If you use AngularJS, have performance issues and need to display lots of readonly data, this project is for you!**




## Installation

```sh
$ bower install angular-once
```

or copy once.js file.

## Usage
##### Prerequisites
* reference once.js file
* add `once` module as dependency to your app (`angular.module('yourApp', ['once'])`)



Lets look at this standard AngularJS code snippet:

```html
<ul>
	<li ng-repeat="user in users">
	  <a ng-href="{{ user.profileUrl }}">{{ user.name }}</a>
		<a ng-href="{{ user.profileUrl }}"><img ng-src="{{ user.avatarUrl }}"></a>
		<div ng-class="{'formatted': user.description}" ng-bind="user.description"></div>
	</li>
</ul>
```

Now given 100 users it's 600 watchers and list is not only information on page in most cases.
If users data needs to be only displayed not edited inline, we don't need to set up watchers in `ng-repeat` directive,
especially as user goes back and forward within the app many times list is being refreshed on each display as controller in angular are transient.

Let's look at the same example using **angular-once**:
```html
<ul>
	<li ng-repeat="user in users">
	  <a once-href="user.profileUrl" once-text="user.name"></a>
		<a once-href="user.profileUrl"><img once-src="user.avatarUrl"></a>
		<div once-class="{'formatted': user.description}" once-bind="user.description"></div>
	</li>
</ul>
```
Number of watchers? **0** (actually 1 as angular uses separate watch for ng-repeat directive itself).

**IMPORTANT: Built in angular `ng-href` and `ng-src` directives support interpolation (`{{ }}` notation), `angular-once` doesn't due to performance reasons (avoid setting up watchers).**

## API

List below contains comparison of angular-once directives ( **one time bindings** ) with  build in angular directives ( **two-way bindings** ).

| 	angular-once | native angular equivalent  | example usage  |
| ------------- |:-------------:|:-----:|
| `once-text="value"`     | `ng-bind` or `{{ }}`  |`<ANY once-text="user.name"></ANY>`|
| `once-html="value"`     | `ng-bind-html` |`<ANY once-html="user.description"></ANY>`|
| `once-src="value"`     | `ng-src` |`<img once-src="user.avatarUrl" />`|
| `once-href="value"`     | `ng-href` |`<a once-href="user.websiteUrl" ></a>`|
| `once-title="value"`     | `ng-attr-title` |`<ANY once-title="user.name"></ANY>`|
| `once-alt="value"`     | `ng-attr-alt` |`<img once-alt="user.name" />`|
| `once-id="value"`     | `ng-attr-id` |`<ANY once-id="user.name" /></ANY>`|
| `once-if="condition"`     | `ng-if` |`<ANY once-if="user.isAdmin" /></ANY>`|
| `once-class="name:cond"`     | `ng-class` |`<ANY once-class="{'p': user.admin}" /></ANY>`|
| `once-style="value"`     | `ng-style` |`<ANY once-style="{color:blue}" /></ANY>`|
| `once-show="condition"`     | `ng-show` |`<ANY once-show="user.isAdmin" /></ANY>`|
| `once-hide="condition"`     | `ng-hide` |`<ANY once-hide="user.isAdmin" /></ANY>`|
| `once once-attr-*="value"`     | `ng-attr-*` |`<ANY once once-attr-tooltip="user.name" /></ANY>`|


#### Important:
One important thing to note is that when using `angular-once` and bound data is `undefined` it creates watch which waits till data is available (promise is resolved)
and then remove that watch itself. Reason for that is to be able to use it with data which is not yet available, but still readonly.

In case bound data contains static and dynamic part, for example `once-src="'http://placekitten.com/'+ kitty.size"` and `kitty-size` isn't
immediately available, you can use `once-wait-for` directive to wait till `kitten.size` is fetched, so it will look like:
`once-src="'http://placekitten.com/'+ kitty.size" once-wait-for='kitty.size'`

## Credits
Thanks both to @Pasvaz for bindonce and @abourget for $watch fighters, as both modules were inspiration and starting point for creating this module.

## Similar projects
* [bindonce](https://github.com/Pasvaz/bindonce) - similar, but requires addtional bindonce directive which wraps other dindonce directives.
* [watch fighters](https://github.com/abourget/abourget-angular) - similar, but doesn't handle case when there is no data yet to bind, simply binds nothing, so doesn't work with promises.

## License
  [WTFPL](LICENSE.txt)
