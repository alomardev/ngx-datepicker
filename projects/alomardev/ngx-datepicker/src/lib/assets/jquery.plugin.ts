import jQuery from 'jquery';
var JQClass: any;
(function(){
	'use strict';
	var initializing = false;
	// The base JQClass implementation (does nothing)
	JQClass = window['JQClass'] = function(){};
	// Collection of derived classes
	JQClass.classes = {};
 
	// Create a new JQClass that inherits from this class
	JQClass.extend = function extender(prop) {
		var base = this.prototype;

		// Instantiate a base class (but only create the instance, don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) { // jshint loopfunc:true
			// Check if we're overwriting an existing function
			if (typeof prop[name] === 'function' && typeof base[name] === 'function') {
				prototype[name] = (function (name, fn) {
					return function () {
						var __super = this._super;
						// Add a new ._super() method that is the same method but on the super-class
						this._super = function (args) {
							return base[name].apply(this, args || []);
						};
						var ret = fn.apply(this, arguments);
						// The method only needs to be bound temporarily, so we remove it when we're done executing
						this._super = __super;
						return ret;
					};
				})(name, prop[name]);
			// Check if we're overwriting existing default options.
			} else if (typeof prop[name] === 'object' && typeof base[name] === 'object' && name === 'defaultOptions') {
				var obj1 = base[name];
				var obj2 = prop[name];
				var obj3 = {};
				var key;
				for (key in obj1) { // jshint forin:false
					obj3[key] = obj1[key];
				}
				for (key in obj2) { // jshint forin:false
					obj3[key] = obj2[key];
				}
				prototype[name] = obj3;
			} else {
				prototype[name] = prop[name];
			}
		}

		// The dummy class constructor
		function JQClass() {
			// All construction is actually done in the init method
			if (!initializing && this._init) {
				this._init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		JQClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		JQClass.prototype.constructor = JQClass;

		// And make this class extendable
		(<any>JQClass).extend = extender;

		return JQClass;
	};
})();
(function($) { // Ensure $, encapsulate
	'use strict';
	JQClass.classes.JQPlugin = JQClass.extend({
		name: 'plugin',
		defaultOptions: {},
		regionalOptions: {},
		deepMerge: true,
		_getMarker: function() {
			return 'is-' + this.name;
		},
		_init: function() {
			// Apply default localisations
			$.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
			// Camel-case the name
			var jqName = camelCase(this.name);
			// Expose jQuery singleton manager
			$[jqName] = this;
			// Expose jQuery collection plugin
			$.fn[jqName] = function(options) {
				var otherArgs = Array.prototype.slice.call(arguments, 1);
				var inst = this;
				var returnValue = this;
				this.each(function () {
					if (typeof options === 'string') {
						if (options[0] === '_' || !$[jqName][options]) {
							throw 'Unknown method: ' + options;
						}
						var methodValue = $[jqName][options].apply($[jqName], [this].concat(otherArgs));
						if (methodValue !== inst && methodValue !== undefined) {
							returnValue = methodValue;
							return false;
						}
					} else {
						$[jqName]._attach(this, options);
					}
				});
				return returnValue;
			};
		},
		setDefaults: function(options) {
			$.extend(this.defaultOptions, options || {});
		},
		_attach: function(elem, options) {
			elem = $(elem);
			if (elem.hasClass(this._getMarker())) {
				return;
			}
			elem.addClass(this._getMarker());
			options = $.extend(this.deepMerge, {}, this.defaultOptions, this._getMetadata(elem), options || {});
			var inst = $.extend({name: this.name, elem: elem, options: options}, this._instSettings(elem, options));
			elem.data(this.name, inst); // Save instance against element
			this._postAttach(elem, inst);
			this.option(elem, options);
		},
		_instSettings: function(elem, options) { // jshint unused:false
			return {};
		},
		_postAttach: function(elem, inst) { // jshint unused:false
		},
		_getMetadata: function(elem) {
			try {
				var data = elem.data(this.name.toLowerCase()) || '';
				data = data.replace(/(\\?)'/g, function(e, t) {
					return t ? '\'' : '"';
				}).replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
					var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
					return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
				}).replace(/\\:/g, ':');
				data = $.parseJSON('{' + data + '}');
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						var value = data[key];
						if (typeof value === 'string' && value.match(/^new Date\(([-0-9,\s]*)\)$/)) { // Convert dates
							data[key] = eval(value); // jshint ignore:line
						}
					}
				}
				return data;
			}
			catch (e) {
				return {};
			}
		},
		_getInst: function(elem) {
			return $(elem).data(this.name) || {};
		},
		option: function(elem, name, value) {
			elem = $(elem);
			var inst = elem.data(this.name);
			var options = name || {};
			if  (!name || (typeof name === 'string' && typeof value === 'undefined')) {
				options = (inst || {}).options;
				return (options && name ? options[name] : options);
			}
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			if (typeof name === 'string') {
				options = {};
				options[name] = value;
			}
			this._optionsChanged(elem, inst, options);
			$.extend(inst.options, options);
		},
		_optionsChanged: function(elem, inst, options) { // jshint unused:false
		},
		destroy: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			this._preDestroy(elem, this._getInst(elem));
			elem.removeData(this.name).removeClass(this._getMarker());
		},
		_preDestroy: function(elem, inst) { // jshint unused:false
		}
	});
	function camelCase(name) {
		return name.replace(/-([a-z])/g, function(match, group) {
			return group.toUpperCase();
		});
	}
	$.JQPlugin = {
		createPlugin: function(superClass, overrides) {
			if (typeof superClass === 'object') {
				overrides = superClass;
				superClass = 'JQPlugin';
			}
			superClass = camelCase(superClass);
			var className = camelCase(overrides.name);
			JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
			new JQClass.classes[className](); // jshint ignore:line
		}
	};

})(jQuery);