import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import Router from 'react-mock-router';

import {
  DictionaryConcepts,
  mapStateToProps,
} from '../../../components/dictionaryConcepts/containers/DictionaryConcepts';
import concepts from '../../__mocks__/concepts';

const store = createMockStore({
  organizations: {
    organizations: [],
  },
});

jest.useFakeTimers();

describe('Test suite for dictionary concepts components', () => {
  it('should render component without breaking', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      conceptsCount: 1,
      totalConceptsCount: 1,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = mount(<Provider store={store}>
      <Router>
        <DictionaryConcepts {...props} />
      </Router>
    </Provider>);
    expect(wrapper.find('h2.text-capitalize').text()).toEqual('dev-col Dictionary');
    jest.runAllTimers();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a loader', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: true,
      conceptsCount: 1,
      totalConceptsCount: 1,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = mount(<Provider store={store}>
      <Router>
        <DictionaryConcepts {...props} />
      </Router>
    </Provider>);
    expect(wrapper.find('Loader')).toHaveLength(1);
  });

  it('should remove a dictionary concept', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      totalConceptCount: 11,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      paginateConcepts: jest.fn(),
      fetchMemberStatus: jest.fn(),
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };

    const wrapper = mount(<Provider store={store}>
      <Router>
        <DictionaryConcepts {...props} />
      </Router>
    </Provider>);
    expect(wrapper).toBeDefined();
    wrapper.find('.btn.btn-sm.mb-1.actionButtons').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('should change open and close delete modal', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = shallow(<DictionaryConcepts {...props} />);
    wrapper.setState({ versionUrl: 'url' });
    wrapper.update();
    const instance = wrapper.instance();
    instance.handleShowDelete();
    expect(wrapper.state().openDeleteModal).toBe(true);
    instance.closeDeleteModal();
    expect(wrapper.state().openDeleteModal).toBe(false);
  });

  it('it should call the handle delete function', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = shallow(<DictionaryConcepts {...props} />);
    const instance = wrapper.instance();
    expect(instance.handleDelete()).toEqual(undefined);
  });

  it('should filter search result', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = mount(<Provider store={store}>
      <Router>
        <DictionaryConcepts {...props} />
      </Router>
    </Provider>);
    const sourceEvent = {
      target: {
        name: 'CIEL,source', checked: true, value: 'ciel', type: 'checkbox',
      },
    };
    const classesEvent = {
      target: {
        name: 'diagnosis,classes', checked: true, value: 'diagnosis', type: 'checkbox',
      },
    };
    const dictionaryConceptsWrapper = wrapper.find('DictionaryConcepts').instance();
    const spy = jest.spyOn(dictionaryConceptsWrapper, 'handleSearch');
    dictionaryConceptsWrapper.forceUpdate();
    wrapper.find('#CIEL').simulate('change', sourceEvent);
    wrapper.find('#Diagnosis').simulate('change', classesEvent);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should filter concepts in the table', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = mount(<Provider store={store}>
      <Router>
        <DictionaryConcepts {...props} />
      </Router>
    </Provider>);
    const event = {
      target: {
        value: 'malaria',
      },
    };
    const dictionaryConceptsWrapper = wrapper.find('DictionaryConcepts').instance();
    const spy = jest.spyOn(dictionaryConceptsWrapper, 'filterCaseInsensitive');
    dictionaryConceptsWrapper.forceUpdate();
    wrapper.find('ReactTable').find('input').at(0).simulate('change', event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test componentWillReceiveProps', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const app = shallow(<DictionaryConcepts {...props} />);
    const newProps = {
      concepts: [concepts],
    };

    app.setState({ searchInput: 'ciel' });
    app.setProps(newProps);
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      concepts: {
        loading: false,
        dictionaryConcepts: [],
        paginatedConcepts: [],
        filteredSources: [],
        filteredClass: [],
      },
      dictionaries: {
        dictionary: [],
      },
      user: {
        userIsMember: false,
      },
    };
    expect(mapStateToProps(initialState).concepts).toEqual([]);
    expect(mapStateToProps(initialState).filteredClass).toEqual([]);
    expect(mapStateToProps(initialState).filteredSources).toEqual([]);
    expect(mapStateToProps(initialState).loading).toEqual(false);
    expect(mapStateToProps(initialState).dictionaries).toEqual([]);
  });

  it('should handle show/hide of the create concept mapping modal', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = shallow(<DictionaryConcepts {...props} />);
    wrapper.instance().handleShowMappingModal(concepts);
    wrapper.update();
    expect(wrapper.instance().state.showMappingModal).toBe(true);
    wrapper.instance().handleHideMappingModal();
    expect(wrapper.instance().state.showMappingModal).toBe(false);
  });

  it('should hide modal after creating concept and refetch dictionary concept', () => {
    const props = {
      match: {
        params: {
          typeName: 'dev-col',
          type: 'orgs',
          collectionName: 'dev-col',
          dictionaryName: 'dev-col',
        },
      },
      location: {
        pathname: '/random/path',
      },
      fetchDictionaryConcepts: jest.fn(),
      concepts: [concepts],
      filteredClass: ['Diagnosis'],
      filteredSources: ['CIEL'],
      loading: false,
      filterBySource: jest.fn(),
      filterByClass: jest.fn(),
      fetchMemberStatus: jest.fn(),
      paginateConcepts: jest.fn(),
      totalConceptCount: 20,
      userIsMember: true,
      removeDictionaryConcept: jest.fn(),
      createConceptMapping: jest.fn(),
    };
    const wrapper = shallow(<DictionaryConcepts {...props} />);
    wrapper.instance().handleShowMappingModal(concepts);
    wrapper.update();
    wrapper.instance().setState({ showMappingModal: true });
    const spy = jest.spyOn(wrapper.instance(), 'fetchConcepts');
    wrapper.instance().handleHideMappingModal(true);
    expect(spy).toHaveBeenCalled();
  });
});
