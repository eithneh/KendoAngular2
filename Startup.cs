using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HookingUpAgain.Startup))]
namespace HookingUpAgain
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
