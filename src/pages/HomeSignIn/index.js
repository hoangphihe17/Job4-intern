import React from 'react';

import HeaderTop from "../../components/HeaderTop";
import Button from "../../components/Button";
import Card from "../../components/Card";
import images from "../../assets/images";
import SlideShow from "../../components/SlideShow";

function HomeSignIn(props) {
    return (
        <div>
            <div className="main">
                <div className="container">
                    <div className="header">
                        <HeaderTop
                            isLogin={true}
                            isInLoginPage={false}
                            href={"/"}
                        />
                        <div className="header-content">
                            <div className="content-title">
                                <h3>
                                    Save your data storage here.
                                </h3>
                            </div>

                            <div className="content-define">
                        <span>
                            Data Warehouse is a data storage area that has been tested for security, so you can store your data here safely but not be afraid of being stolen by others.
                        </span>
                            </div>

                            <Button primary>Learn more</Button>
                        </div>
                    </div>

                    <div className="features">
                        <div className="fea-title">
                            <h2>Features</h2>
                            <span>Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.</span>
                        </div>

                        <div className="fea-actions">

                            <Card title="Search Data"
                                  content="Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time."
                                  img={images.feaSearch}
                                  bg={images.bgFeaSearch}
                            />

                            <Card title="24 Hours Access"
                                  content="Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent."
                                  img={images.access}
                                  bg={images.bgAccess}
                            />

                            <Card title="Print Out"
                                  content="Print out service gives you convenience if someday you need print data, just edit it all and just print it."
                                  img={images.print}
                                  bg={images.bgPrint}
                            />

                            <Card title="Security Code"
                                  content="Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file."
                                  img={images.security}
                                  bg={images.bgSecurity}
                            />

                        </div>
                    </div>

                    <div className="testimonials">
                        <div className="testi-title">
                            <span>Testimonials</span>
                        </div>

                        <div className="testi-slide">
                            <SlideShow
                                avt={images.avtSlide}
                                name="John Fang"
                                contact="wordfaang.com"
                                about="Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla."
                                iconL={images.btnLeft}
                                iconR={images.btnRight}
                            />
                        </div>
                    </div>
                </div>


                <div className="footer">
                    <div className="footer-container">
                        <div className="address-comp">
                            <div className="footer-logo">
                                <img src={images.logo} alt=""/>
                                <span>DataWarehouse</span>
                            </div>

                            <span className="address">
                            Warehouse Society, 234 Bahagia Ave Street PRBW 29281
                        </span>

                            <span className="contact">
                            info@warehouse.project 1-232-3434 (Main)
                        </span>
                        </div>

                        <div className="about-comp">
                            <span className="about-title">About</span>
                            <div className="about-contents">
                                <span>Profile Features Careers DW News</span>
                            </div>
                        </div>

                        <div className="help-comp">
                            <span className="help-title">Help</span>
                            <div className="help-contents">
                                <span>Support Sign up Guide Reports Q&A</span>
                            </div>
                        </div>

                        <div className="social-media">
                            <span className="media-title">Social Media</span>
                            <div className="medias">
                                <img src={images.media} alt=""/>
                                <img src={images.media} alt=""/>
                                <img src={images.media} alt=""/>
                            </div>
                        </div>
                    </div>


                    <div className="copyright">
                        <span>© Datawarehouse™, 2020. All rights reserved. Company Registration Number: 21479524.</span>
                        <img src={images.message} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSignIn;