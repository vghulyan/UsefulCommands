//MapMyObject.js
export const getRequestObject = (userDetails, transferDetails, policies) => ({
    customer: getCustomerObj(userDetails),
    policy: getPolicyObj(transferDetails.selectedPolicyNumber, policies),
    transfers: transferDetails.transfers,
});

//postAPI.js
export const postAPI = async () => {
    try {
        const state = store.getState();
        const url = `${BASE_URL}/theAPI`;
        const headers = { Authorization: 'MY TOKEN' };
        const request = await getMapMyObject(
            state.userDetails, state.transferDetails, state.policies,
        );
        await axios.post(url, request, { headers, ...axiosConfig });
        return true;
    } catch (e) {
        return false;
    }
};

import mockAxios from 'axios';
import mockAxiosRetry from 'retry-axios';
import { postAPI } from './postAPI';
import { getMapMyObject } from './MapMyObject';
import axiosConfig from '../AxiosConfig';
import mockStore from '../../../store/store';

jest.mock('../../../store/store');
jest.mock('./MapMyObject');

const data = {
    customer: {
        firstName: 'Vardan',
        lastName: 'Ghulyan',
        ...
    },
    policy: {
        policyNumber: '123',
        policyType: 'A123',
        systemId: '0',
    },
    transfers: [{
        policyNumber: '999',
        schemeName: 'schema name',
        providerName: 'The provider name',
        transferValue: '111',
    }],
};

const userDetails = {
    firstName: 'Vardan',
    lastName: 'Ghulyan',
};
const transferDetails = {
    accepted: true,
    selectedPolicyNumber: '123',
    transfers: [{
        policyNumber: '11111',
        providerName: 'The provider name',
        schemeName: 'schema name',
        transferValue: '999',
    }],
};
const policies = [{
    id: 0,
    pensionType: 'XYZ',
    policy: { policyNumber: '123', policyType: 'A123' },
    policyNumber: '123456',
    policyType: 'A123',
    title: 'Title',
    systemId: 0,
}];

describe('The test case description with redux and back end API call', () => {
    const BASE_URL = process.env.REACT_APP_SEND_URL;
    const headers = { Authorization: 'MY TOKEN' };
    const mockState = {
        userDetails,
        transferDetails,
        policies,
    };

    const { customer } = data;
    const { transfers } = data;
    const { policy } = data;

    const mockRequest = {
        policy,
        transfers,
        customer,
    };

    afterEach(() => {
        mockAxios.post.mockClear();
        mockStore.getState.mockClear();
        getMapMyObject.mockClear();
    });

    it('returns true if data is correct', async () => {
        mockStore.getState.mockImplementation(() => mockState);
        getMapMyObject.mockImplementation(() => mockRequest);
        mockAxios.post.mockImplementation(() => Promise.resolve(true));

        const result = await postAPI();

        expect(result).toBe(true);
        expect(mockAxiosRetry.attach).toHaveBeenCalledTimes(1);
        expect(mockStore.getState).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            `${BASE_URL}/theAPI`, data,
            { headers, ...axiosConfig },
        );
    });

    it('returns false where there is an error - no data', async () => {
        mockStore.getState.mockImplementation(() => ({}));
        getMapMyObject.mockImplementation(() => ({}));

        mockAxios.post.mockImplementation(() => Promise.reject(new Error('Fail')));

        const result = await postAPI();

        expect(result).toEqual(false);
        expect(mockAxiosRetry.attach).toHaveBeenCalledTimes(1);
        expect(mockStore.getState).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith(
            `${BASE_URL}/theAPI`, {},
            { headers, ...axiosConfig },
        );
    });
});
