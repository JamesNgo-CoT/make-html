const makeHtml = (() => {
	const components = {};

	function makeHtml(options) {
		if (options instanceof Node) {
			return options;
		}

		// -----

		if (Array.isArray(options)) {
			const node = document.createDocumentFragment();

			for (let index = 0, length = options.length; index < length; index++) {
				if (options[index] == null) {
					continue;
				}

				node.appendChild(makeHtml(options[index]));
			}

			return node;
		}

		// -----

		if (options.component) {
			return makeHtml(components[options.component](options));
		}

		// -----

		if (options.element) {
			const { namespace, element, attributes, children, callback } = options;

			const node = namespace
				? document.createElementNS(namespace, element)
				: document.createElement(element);

			if (attributes != null) {
				for (let key in attributes) {
					if (attributes[key] == null) {
						continue;
					}

					node.setAttribute(key, attributes[key]);
				}
			}

			if (children != null) {
				node.appendChild(makeHtml(children));
			}

			if (callback != null) {
				callback(node);
			}

			return node;
		}

		// -----

		if (options.children) {
			const { children, callback } = options;

			const node = makeHtml(children);

			if (callback != null) {
				callback(node);
			}

			return node;
		}

		// -----

		return document.createTextNode(options);
	}

	makeHtml.register = (component) => {
		components[component.name] = component;
		return makeHtml;
	};

	return makeHtml;
})();

export default makeHtml;
