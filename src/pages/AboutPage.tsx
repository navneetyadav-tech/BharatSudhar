import { useState } from 'react';
import { ShieldCheck, Target, HeartHandshake, Award, HelpCircle, Check } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';

export function AboutPage() {
  const [pledged, setPledged] = useState(false);
  const [citizenName, setCitizenName] = useState('');

  const values = [
    {
      title: 'Civic Accountability',
      desc: 'Shifting from passive complaints to constructive, trackable reporting with photographic evidence.',
      icon: Target,
    },
    {
      title: 'Community Empowerment',
      desc: 'Enabling neighbors and resident welfare associations (RWAs) to unite for local neighborhood upgrades.',
      icon: HeartHandshake,
    },
    {
      title: 'Municipal Transparency',
      desc: 'Promoting clear timelines, ward-level responsibilities, and public audit of civic maintenance.',
      icon: ShieldCheck,
    },
    {
      title: 'National Pride (Swachhta)',
      desc: 'Honoring Mahatma Gandhi’s vision of clean villages and cities as the primary duty of every citizen.',
      icon: Award,
    },
  ];

  const faqs = [
    {
      q: 'What is Bharat Sudhar?',
      a: 'Bharat Sudhar is a nationwide civic engagement portal designed to bridge the gap between conscientious citizens and municipal authorities to ensure faster resolution of local infrastructure issues.',
    },
    {
      q: 'What does "Ab Har Nagrik Zimmedaar" signify?',
      a: 'It represents a shift in mindset: instead of waiting passively for someone else to fix public issues or neglecting public property, every citizen takes responsibility by reporting, protecting, and keeping surroundings clean.',
    },
    {
      q: 'How are reported issues routed to the authorities?',
      a: 'Each issue is categorized and geotagged. Based on PIN code and municipal jurisdiction, the issue is directed to the designated ward engineer or municipal corporation desk.',
    },
    {
      q: 'Is there any fee to report issues?',
      a: 'No, Bharat Sudhar is 100% free and open to every citizen of India.',
    },
  ];

  return (
    <div className="py-12 lg:py-16 space-y-16 bg-[#F4F8FC]">
      {/* Header Banner */}
      <section>
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="saffron" className="px-3.5 py-1 rounded-full">
              About The National Initiative
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#172B4D] tracking-tight">
              Transforming Civic Spirit Across India
            </h1>
            <p className="text-lg text-[#718096] leading-relaxed">
              Bharat Sudhar was conceived on the principle that the cleanliness and safety of our nation begins with the proactive vigilance of its citizens.
            </p>
          </div>
        </Container>
      </section>

      {/* Slogan & Philosophy Section */}
      <section className="bg-white py-12 border-y border-[#DCE6F0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#3157A4] font-bold uppercase tracking-wider text-xs">
                Our Core Philosophy
              </div>
              <h2 className="text-3xl font-extrabold text-[#172B4D]">
                &ldquo;Ab Har Nagrik Zimmedaar&rdquo;
              </h2>
              <p className="text-[#718096] leading-relaxed text-sm sm:text-base">
                For decades, civic grievances remained trapped in bureaucratic delays or public apathy. &ldquo;Ab Har Nagrik Zimmedaar&rdquo; is a call to action. It asserts that every individual who walks on a street, drinks tap water, or uses public roads shares the ownership of public spaces.
              </p>
              <p className="text-[#718096] leading-relaxed text-sm sm:text-base">
                When you see an overflowing dustbin, an uncovered manhole, or broken streetlights, you don&apos;t just walk past — you report it, track it, and hold the system accountable until it is resolved.
              </p>
            </div>

            {/* Interactive Citizen Pledge Card */}
            <div id="pledge">
              <Card className="bg-white border border-[#DCE6F0] p-8 rounded-2xl relative overflow-hidden shadow-subtle hover:border-[#3157A4]/30 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3157A4] text-white flex items-center justify-center shadow-subtle">
                      <ShieldCheck className="w-6 h-6 text-[#EAB308]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172B4D] text-lg">
                        The Bharat Sudhar Pledge
                      </h3>
                      <p className="text-xs text-[#718096]">Citizen Commitment</p>
                    </div>
                  </div>

                  <blockquote className="italic text-[#172B4D] text-sm border-l-4 border-[#FACC15] pl-4 py-2 leading-relaxed bg-[#F4F8FC] rounded-r-xl">
                    &ldquo;I hereby pledge to respect public property, never litter my streets, promptly report civic hazards, and actively support my municipality in maintaining a clean, safe, and progressive India.&rdquo;
                  </blockquote>

                  {pledged ? (
                    <div className="p-4 bg-[#22A982]/10 border border-[#22A982]/20 rounded-xl text-[#22A982] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#22A982] text-white flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#172B4D]">Pledge Registered!</p>
                        <p className="text-xs text-[#22A982]">
                          Thank you {citizenName || 'Responsible Citizen'} for standing with Bharat Sudhar.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <input
                        type="text"
                        placeholder="Enter your name (e.g., Aarav Sharma)"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE6F0] text-sm text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20 shadow-subtle"
                      />
                      <Button
                        variant="saffron"
                        size="md"
                        className="w-full font-bold shadow-subtle rounded-xl"
                        onClick={() => setPledged(true)}
                      >
                        Take the Digital Pledge
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-[#172B4D]">
              Our Guiding Principles
            </h2>
            <p className="text-[#718096] text-sm">
              Values that anchor the Bharat Sudhar citizen movement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className="p-6 bg-white border border-[#DCE6F0] rounded-2xl shadow-subtle hover:border-[#3157A4]/30 hover:shadow-card transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#3157A4] text-white flex items-center justify-center mb-4 shadow-subtle">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#172B4D] text-base mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#718096] leading-relaxed">
                    {v.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section>
        <Container size="lg">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3157A4] bg-white px-3.5 py-1 rounded-full border border-[#DCE6F0] shadow-subtle">
              <HelpCircle className="w-3.5 h-3.5 text-[#3157A4]" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-extrabold text-[#172B4D]">
              Common Inquiries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q} className="p-6 bg-white border border-[#DCE6F0] rounded-2xl shadow-subtle hover:border-[#3157A4]/30 transition-all">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-base text-[#172B4D] font-bold">
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm text-[#718096] leading-relaxed">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
