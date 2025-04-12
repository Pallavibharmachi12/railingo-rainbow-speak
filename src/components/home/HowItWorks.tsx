
import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Railingo simplifies the process of creating and delivering multilingual announcements
          </p>
        </div>

        <div className="relative">
          {/* Step connector line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rainbow-purple via-rainbow-blue to-rainbow-pink hidden md:block"></div>

          {/* Step 1 */}
          <div className="relative mb-16">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                <div className="text-right hidden md:block">
                  <div className="bg-background p-6 rounded-lg shadow-sm border inline-block">
                    <h3 className="text-xl font-semibold mb-2">1. Station Master Input</h3>
                    <p className="text-muted-foreground">
                      The station master enters train information like number, name, source, destination, and status into the admin dashboard.
                    </p>
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="bg-background p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">1. Station Master Input</h3>
                    <p className="text-muted-foreground">
                      The station master enters train information like number, name, source, destination, and status into the admin dashboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12 relative">
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full rainbow-gradient z-10 border-4 border-background"></div>
                <div className="h-48 bg-rainbow-purple/10 rounded-lg animate-pulse-soft"></div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-16">
            <div className="md:flex items-center flex-row-reverse">
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                <div className="text-left hidden md:block">
                  <div className="bg-background p-6 rounded-lg shadow-sm border inline-block">
                    <h3 className="text-xl font-semibold mb-2">2. AI Text Generation</h3>
                    <p className="text-muted-foreground">
                      The system uses AI to generate natural language announcements based on the train data entered.
                    </p>
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="bg-background p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">2. AI Text Generation</h3>
                    <p className="text-muted-foreground">
                      The system uses AI to generate natural language announcements based on the train data entered.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pr-12 relative">
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full rainbow-gradient z-10 border-4 border-background"></div>
                <div className="h-48 bg-rainbow-blue/10 rounded-lg animate-pulse-soft"></div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative mb-16">
            <div className="md:flex items-center">
              <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
                <div className="text-right hidden md:block">
                  <div className="bg-background p-6 rounded-lg shadow-sm border inline-block">
                    <h3 className="text-xl font-semibold mb-2">3. Multilingual Translation</h3>
                    <p className="text-muted-foreground">
                      Announcements are automatically translated into multiple languages while preserving context and meaning.
                    </p>
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="bg-background p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">3. Multilingual Translation</h3>
                    <p className="text-muted-foreground">
                      Announcements are automatically translated into multiple languages while preserving context and meaning.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12 relative">
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full rainbow-gradient z-10 border-4 border-background"></div>
                <div className="h-48 bg-rainbow-cyan/10 rounded-lg animate-pulse-soft"></div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="md:flex items-center flex-row-reverse">
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                <div className="text-left hidden md:block">
                  <div className="bg-background p-6 rounded-lg shadow-sm border inline-block">
                    <h3 className="text-xl font-semibold mb-2">4. Audio Delivery</h3>
                    <p className="text-muted-foreground">
                      Realistic AI-generated voices deliver the announcements in each language, with station bell sounds and clear pronunciation.
                    </p>
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="bg-background p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-semibold mb-2">4. Audio Delivery</h3>
                    <p className="text-muted-foreground">
                      Realistic AI-generated voices deliver the announcements in each language, with station bell sounds and clear pronunciation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pr-12 relative">
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full rainbow-gradient z-10 border-4 border-background"></div>
                <div className="h-48 bg-rainbow-pink/10 rounded-lg animate-pulse-soft"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
