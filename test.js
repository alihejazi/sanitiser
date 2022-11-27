const x = {
    k1: null,
    k2: "",
    a: 1,
    b: [1, 2, 3, 4, '', null, {}],
    c: {k1: ''},
    d: ['', '', 'hi', null, undefined, {
        k3: null,
        k4: undefined,
        k5: 'hello',
        k6: 0,
        k7: -1,
        k8: '',
        k9: ' ',
        k10: ['hello', 'this', '', 'is', 'a', 'test', 1, 0, -1, true, false, undefined, null, 1.1],
    }],
};

const y = {
    c: {k1: ''},
};

const sanitiser = (obj) => isJson(obj) ? sanitiseJson(obj) : Array.isArray(obj) ? sanitiseArray(obj) : obj;

const sanitiseJson = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        const val = Array.isArray(obj[key]) ? sanitiseArray(obj[key]) : obj[key];
        if (isValueEmpty(val)) {
            return acc;
        }
        acc[key] = val;
        return acc;
    }, {});
}

const sanitiseArray = (val) => {
    return val.reduce((acc, el) => {
        const sanitised = sanitiser(el);
        if (isValueEmpty(sanitised)) {
            return acc;
        }
        acc.push(sanitised);
        return acc;
    }, []);
}

const isValueEmpty = (val) => {

    if ([null, undefined, ''].includes(val)) {
        return true;
    }

    if (isJson(val)) {
        if (Object.keys(sanitiseJson(val)).length === 0) {
            return true;
        }
    }

    else if (Array.isArray(val)) {
        if (sanitiseArray(val).length === 0) {
            return true;
        }
    }

    return false;
}

const isJson = (val) => typeof(val) === 'object' && val !== null && !Array.isArray(val);

console.log(JSON.stringify(sanitiser({}), null, 2));
