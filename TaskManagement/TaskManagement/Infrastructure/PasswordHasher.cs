using System.Security.Cryptography;

namespace TaskManagement.Infrastructure
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 100000;
        private readonly HashAlgorithmName _algorithm = HashAlgorithmName.SHA512;
        public (string hash, string salt) Hash(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _algorithm, HashSize);

            return (Convert.ToHexString(hash), Convert.ToHexString(salt));
        }

        public bool Verify(string password, string passwordHash, string passwordSalt)
        {
            var salt = Convert.FromHexString(passwordSalt);
            var parsedHash = Convert.FromHexString(passwordHash);
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, _algorithm, HashSize);

            return CryptographicOperations.FixedTimeEquals(parsedHash, hash);
        }
    }
}
