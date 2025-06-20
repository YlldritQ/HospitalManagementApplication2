namespace backend.Core.Settings
{
    public record EmailSettings(string Host, int Port, string User, string Pass, string From);
}
