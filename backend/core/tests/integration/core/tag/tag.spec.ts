import 'reflect-metadata';
import { assert } from 'chai';
import tags from './data/tags.json';
import { omit } from '../../../helpers/helpers';
import { TestTagRepositoryAdapter } from './tag-repository-adapter';
import { TagService } from '../../../../src/core/tag/application/tag-service';
import { TestVideoReposirotyAdapter } from '../video/video-repository-adapter';
import { TagController } from '../../../../src/primary-adapters/rest/tag/tag-controller';

const videoRepositoryAdapter = new TestVideoReposirotyAdapter();
const tagRepositoryAdapter = new TestTagRepositoryAdapter();
const tagService = new TagService(tagRepositoryAdapter, videoRepositoryAdapter);
const tagController = new TagController(tagService);

describe('TagController tests:', () => {
  it('should getting tag by id', async () => {
    const expectedTag = omit(tags[4], 'createdAt', 'updatedAt');
    const actualTag = await tagController.getById('0e7412c4-ad38-4629-938f-1913c821e0f3');

    assert.deepEqual(actualTag, expectedTag);
  });

  it('should not found tag by id', async () => {
    try {
      await tagController.getById('not_exist_id');
    } catch ({ message }) {
      assert.equal(message, 'Invalid Tag id');
    }
  });
});
