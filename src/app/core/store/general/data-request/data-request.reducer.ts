import { createReducer, on } from '@ngrx/store';

import { HttpError } from 'ish-core/models/http-error/http-error.model';
import { setErrorOn, setLoadingOn, unsetLoadingOn } from 'ish-core/utils/ngrx-creators';

import { confirmDataRequest, confirmDataRequestFail, confirmDataRequestSuccess } from './data-request.actions';

export interface DataRequestState {
  status: number;
  code: string;
  loading: boolean;
  error: HttpError;
}

const initialState: DataRequestState = {
  status: undefined,
  code: undefined,
  loading: false,
  error: undefined,
};

export const dataRequestReducer = createReducer(
  initialState,
  setLoadingOn(confirmDataRequest),
  unsetLoadingOn(confirmDataRequestSuccess, confirmDataRequestFail),
  setErrorOn(confirmDataRequestFail),
  on(confirmDataRequestFail, (_, action) => {
    const error = action.payload.error;

    return {
      ...initialState,
      loading: false,
      status: error.status,
      error,
    };
  }),
  on(confirmDataRequestSuccess, (state, action) => {
    const status = action.payload.status;
    const code = action.payload.code;

    return {
      ...state,
      status: status ? status : 200,
      code: code ? code : '',
    };
  })
);
