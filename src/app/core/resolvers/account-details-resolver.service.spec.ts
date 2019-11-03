import { TestBed } from '@angular/core/testing';

import { AccountDetailsResolverService } from './account-details-resolver.service';

describe('AccountDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountDetailsResolverService = TestBed.get(AccountDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
