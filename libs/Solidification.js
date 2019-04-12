import _ from 'lodash'

class solidification {
    constructor(options = {}, store) {
        const { key = 'vuex', local, session } = options;

        // store internal value
        this._key = key;
        this._status = null;

        // get configuration
        this._config = this.getConfig(local, session);

        // merge history data to store.state
        store.replaceState(
            _.merge(
                store.state,
                this.getState(this._key, window && window.localStorage),
                this.getState(
                    this._key,
                    window && window.sessionStorage
                )
            )
        );
        
        // store state after mutations method use
        store.subscribe((mutation, state) => {
            this.storeState(state);
        });
    }

    storeState(state) {
        this._config.forEach(config => {
            const { storage, include, exclude } = config;

            this.setState(
                this._key,
                include
                    ? this.handleIncludeData(include, state)
                    : this.handleExcludeData(exclude, state),
                storage
            );
        });
    }

    handleIncludeData(path, state) {
        return _.pick(_.cloneDeep(state), path);
    }

    handleExcludeData(path, state) {
        return _.omit(_.cloneDeep(state), path);
    }

    getConfig(local, session) {
        this._status = (status = (local ? 1 : 0) + (session ? 2 : 0))
            ? Number(status)
            : 1;

        this.checkParams(local, session);

        return this.constructConfig(local, session);
    }

    constructConfig(local, session) {
        if (
            (!local && !session) ||
            (local && !session && !Object.keys(local).length)
        ) {
            local = {
                exclude: []
            };
        }

        if (!local && session && !Object.keys(session).length) {
            session = {
                exclude: []
            };
        }

        return this.collect(local ? local : null, session ? session : null);
    }

    collect(...args) {
        return [...args]
            .map((value, index) => {
                if (value) {
                    return {
                        storage: index
                            ? window && window.sessionStorage
                            : window && window.localStorage,
                        ...value
                    };
                }
            })
            .filter(value => {
                return value;
            });
    }

    checkParams(local, session) {
        if (this._status !== 3) {
            const pos = this._status - 1 ? session : local;

            if (pos) {
                const { include, exclude } = pos;

                if (include && exclude) {
                    throw new Error('include and exclude can not use both');
                }
            }
        } else {
            if (
                this.checkBothExistExclude(session) ||
                this.checkBothExistExclude(local)
            ) {
                throw new Error(
                    'In the case (local and session existence), Only exist include And include must be array'
                );
            }

            if (this.checkoutExistRepeatKey(session.include, local.include)) {
                throw new Error('local and session can not have the same key');
            }
        }
    }

    checkBothExistExclude(obj) {
        const { exclude, include } = obj;

        return exclude || !include || !Array.isArray(include) ? true : false;
    }

    checkoutExistRepeatKey(sessionKeys, localKeys) {
        return (
            sessionKeys.length + localKeys.length !==
            [...new Set(sessionKeys.concat(localKeys))].length
        );
    }

    setState(key, state, storage) {
        return storage.setItem(key, JSON.stringify(state));
    }

    getState(key, storage, value) {
        try {
            return (value = storage.getItem(key)) && typeof value !== 'undefined'
                ? JSON.parse(value)
                : {};
        } catch (err) { }

        return {};
    }
}

export default solidification;
