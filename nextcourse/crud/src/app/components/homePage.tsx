"use client";

export default function HomePage() {
  return (
    <section>
      <div
        className="relative flex flex-col h-screen sm:min-h-screen bg-cover bg-center lg:bg-[url('/assets/images/hero_img/hero_bg.png')]"
        // style={{ backgroundImage: "url('/hero_bg.png')" }}
      >
        <div className="h-[10%] sm:h-[30%]">{/* <Header /> */}</div>
        <div className="h-[70%] my-auto">{/* <Hero /> */}</div>
      </div>
      <div className="w-full px-6 md:px-12 lg:px-[80px] xl:px-[100px] relative overflow-hidden flex flex-col gap-[80px] xl:gap-[150px]">
        {/* Committed to Excellence */}
        <div className="w-full  flex flex-col justify-center items-center gap-16 mt-[100px]">
          <div className="flex flex-col items-center gap-6 ">
            <div className="text-center text-[#fbfafd] text-3xl md:text-5xl font-bold font-['Inter']">
              Committed to Excellence
            </div>
            <div className="max-w-full md:max-w-[750px] text-center text-gray-300 text-sm md:text-base font-bold font-['Inter']">
              We strive to deliver the highest standards in everything we do,
              ensuring quality, innovation, and integrity at every step.
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <motion.div
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {[
                {
                  title: "Mission",
                  content:
                    "A mission statement clarifies what the company wants to achieve, who they want to support, and why they want to support them.",
                  image: "/assets/images/commited/mission.svg",
                },
                {
                  title: "Vision",
                  content:
                    "A vision statement provides direction for future aspirations and aligns everyone in the organization towards a common goal.",
                  image: "/assets/images/commited/vision.svg",
                },
                {
                  title: "Commitment",
                  content:
                    "Commitment to excellence and innovation drives us to deliver exceptional value to our clients and stakeholders.",
                  image: "/assets/images/commited/commitment.svg",
                },
              ].map((card, index) => (
                <motion.div key={index} variants={cardVariant} className="">
                  <CommitedCard
                    title={card.title}
                    content={card.content}
                    image={card.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* <motion.div
          className="w-full flex flex-col gap-16 justify-center items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            className="self-stretch flex flex-col justify-start items-center gap-6"
            variants={fadeInUp}
          >
            <div className="self-stretch text-center text-[#fbfafd] text-3xl md:text-5xl font-bold font-['Inter']">
              About Us
            </div>
            <div className="max-w-full md:max-w-[750px] text-center text-gray-300 text-sm md:text-base font-normal font-['Inter'] mb-5">
              We strive to deliver the highest standards in everything we do,
              ensuring quality, innovation, and integrity at every step.
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
            <motion.div
              className="w-full lg:w-1/2 h-full flex justify-center items-center"
              variants={fadeIn}
            >
              <Image
                src="/assets/images/about/about.jpg"
                alt="Descriptive Alt Text"
                width={600}
                height={418}
                className="rounded-3xl object-cover"
              />
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 flex flex-col gap-6"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4">
                <div className="text-[#f8a953] text-sm font-semibold font-['Inter']">
                  WHO WE ARE
                </div>
                <div className="w-[120px] h-px bg-[#f8a953]" />
              </div>

              <div className="text-gray-400 text-sm md:text-base font-['Roboto'] leading-relaxed text-justify">
                At DanpheLink, we pride ourselves on offering dynamic IT
                solutions to suit your specific requirements. Our flexible
                approach means we can adjust our offerings to accommodate your
                evolving needs, whether you require comprehensive IT
                infrastructure support, strategic consultancy, or software
                development. We&apos;re dedicated to understanding and driving
                each client&apos;s success in every aspect of our work. Our team
                of experts is ready to collaborate with you every step of the
                way, from initial consultation to implementation.
              </div>

              <motion.div
                className="flex flex-col gap-4"
                variants={staggerContainer}
              >
                {[
                  "Tailored Solutions",
                  "Proactive Communication",
                  "Continuous Improvement and Support",
                  "Expert Guidance and Industry Insight",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                  >
                    <Image
                      src="/check.svg"
                      alt="Check Icon"
                      width={20}
                      height={20}
                    />
                    <div className="text-gray-400 text-sm md:text-base font-normal font-['Roboto']">
                      {item}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div> */}

        {/* <motion.div
          className="w-full flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col justify-start items-start gap-16 mx-auto"
            variants={fadeInUp}
          >
            <motion.div
              className="self-stretch flex flex-col justify-start items-center gap-4"
              variants={fadeInUp}
            >
              <h2 className="self-stretch text-center text-[#fbfafd] text-3xl md:text-5xl font-bold font-['Inter']">
                What We Offer
              </h2>
              <p className="max-w-full md:max-w-[750px] text-center text-gray-300 text-sm md:text-base font-normal font-['Roboto']">
                Delivering innovative solutions across web development, design,
                and digital experiences to help your business thrive in a
                competitive landscape.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center lg:justify-between items-start gap-4"
              variants={staggerContainer}
            >
              {[
                {
                  image: "/dev1.png",
                  title: "Software Development",
                  description:
                    "Crafting responsive, user-friendly, and performance-driven websites tailored to your needs. From design to deployment, we bring your ideas to life with modern technologies and scalable solutions.",
                },
                {
                  image: "/dev2.png",
                  title: "Cyber Security",
                  description:
                    "Delivering robust, proactive, and cutting-edge cybersecurity solutions to safeguard your digital assets. From threat detection to risk mitigation, we protect your business with modern strategies and scalable defenses tailored to your unique needs.",
                },
                {
                  image: "/dev5.png",
                  title: "Animation",
                  description:
                    "Creating dynamic, engaging, and visually captivating animations tailored to your vision. From concept to final render, we bring stories to life with modern techniques, seamless motion, and scalable solutions for every platform.",
                },
                {
                  image: "/dev5.png",
                  title: "IT Infrastructure Support",
                  description:
                    "Providing reliable, efficient, and scalable IT infrastructure support to keep your operations running smoothly. From system maintenance to network optimization, we deliver tailored solutions to meet your business needs with modern tools and expert care.",
                },
              ].map((service, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <ServiceCard
                    image={service.image}
                    title={service.title}
                    description={service.description}
                    link="services"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="flex justify-end" variants={fadeInUp}>
            <PrimaryButton title="View All" link="services" />
          </motion.div>
        </motion.div> */}

        <div className="-mt-12">{/* <LetsBuildSection /> */}</div>
      </div>

      {/* <Footer /> */}
    </section>
  );
}
