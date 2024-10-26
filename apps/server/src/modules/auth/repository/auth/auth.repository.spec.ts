import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthRepository } from './auth.repository';
import { User } from '@sportix/models';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;

  const mockUser = {
    id: 'some-uuid',
    email: 'test@example.com',
    password: 'hashedPassword',
    tagName: 'testTag',
  };

  const mockUserModel = {
    create: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create and return a new user', async () => {
      const result = await authRepository.signup(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserModel.create).toHaveBeenCalled();
    });
  });

  describe('findForSignin', () => {
    it('should return a user if found', async () => {
      mockUserModel.findOne.mockResolvedValue(mockUser);

      const result = await authRepository.findForSignin('test@example.com');
      expect(result).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        $or: [{ email: 'test@example.com' }, { tagName: 'test@example.com' }],
      });
    });

    it('should return null if no user is found', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      const result = await authRepository.findForSignin('notfound@example.com');
      expect(result).toBeNull();
    });
  });
});
