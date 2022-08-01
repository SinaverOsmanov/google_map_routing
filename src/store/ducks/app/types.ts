export type StateStatus = 'LOADING' | 'SUCCESS' | 'IDLE' | 'FAILURE';

export interface InitdataState {
    readonly status: StateStatus;
    readonly list: any;
    readonly counter: number;
}

export type InitDataAction = {
    payload: any;
};
