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
and doesn't create any watchers so is incredibly fast!

**bottom line: If you use AngularJS, have performance issues and need to display lots of readonly data, this project is for you!**




## Installation

```sh
$ bower install angular-once
```

or copy once.js file to your project and reference it.

## Usage

## Credits
Thanks both to @Pasvaz for bindonce and @abourget for $watch fighters, as both modules were inspiration and starting point for creating this module.

## License
  [WTFPL](LICENSE.txt)
