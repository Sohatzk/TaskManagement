namespace TaskManagement.Infrastructure
{
    public interface IPasswordHasher
    {
        (string hash, string salt) Hash(string password);
        bool Verify(string password, string passwordHash, string passwordSalt);
    }
}
